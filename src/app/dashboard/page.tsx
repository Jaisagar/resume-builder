
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Profile from "../../../public/img/profile.jpg";
import InnerBanner from "@/src/components/Innerbaner";

type DataType = "users" | "resumes" | "applications";

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);

  const [stats, setStats] = useState({
    users: 0,
    resumes: 0,
    applications: 0,
  });

  const [selectedType, setSelectedType] = useState<DataType>("users");
  const [tableData, setTableData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      router.push("/login");
      return;
    }

    setUser(JSON.parse(savedUser));

    fetchDashboardStats();
  }, [router]);


  const fetchDashboardStats = async () => {
    try {
      const [usersRes, resumesRes, applicationsRes] =
        await Promise.all([
          fetch("http://localhost:8000/users"),
          fetch("http://localhost:8000/resumes"),
          fetch("http://localhost:8000/application"),
        ]);

      const users = await usersRes.json();
      const resumes = await resumesRes.json();
      const applications = await applicationsRes.json();

      setStats({
        users: users.length,
        resumes: resumes.length,
        applications: applications.length,
      });


      setTableData(users);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    }
  };


  const handleCardClick = async (type: DataType) => {
    setSelectedType(type);
    setLoading(true);

    let url = "";

    if (type === "users") {
      url = "http://localhost:8000/users";
    } else if (type === "resumes") {
      url = "http://localhost:8000/resumes";
    } else if (type === "applications") {
      url = "http://localhost:8000/application";
    }

    try {
      const response = await fetch(url);
      const data = await response.json();

      setTableData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setTableData([]);
    } finally {
      setLoading(false);
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };


  const getTableTitle = () => {
    if (selectedType === "users") {
      return "All Users";
    }

    if (selectedType === "resumes") {
      return "All Resumes";
    }

    return "Applications Sent";
  };

  return (
    <>
      <InnerBanner />
      <section className="space">
        <div className="container">
          <div className="row">

            <div className="col-lg-9">

              {/* ================= STAT CARDS ================= */}
              <div className="row">

                {/* USERS */}
                <div className="col-md-4">
                  <div
                    className={`user-main ${
                      selectedType === "users" ? "active" : ""
                    }`}
                    onClick={() => handleCardClick("users")}
                    style={{ cursor: "pointer" }}
                  >
                    <span>{stats.users}</span>

                    <div className="contents-carsd">
                      <h4>Total Users</h4>
                      <p>
                        Empowering smarter hiring decisions through data.
                      </p>
                    </div>
                  </div>
                </div>

                {/* RESUMES */}
                <div className="col-md-4">
                  <div
                    className={`user-main ${
                      selectedType === "resumes" ? "active" : ""
                    }`}
                    onClick={() => handleCardClick("resumes")}
                    style={{ cursor: "pointer" }}
                  >
                    <span>{stats.resumes}</span>

                    <div className="contents-carsd">
                      <h4>Total Resumes</h4>
                      <p>
                        Monitor your hiring journey with real-time insights.
                      </p>
                    </div>
                  </div>
                </div>

                {/* APPLICATIONS */}
                <div className="col-md-4">
                  <div
                    className={`user-main ${
                      selectedType === "applications" ? "active" : ""
                    }`}
                    onClick={() => handleCardClick("applications")}
                    style={{ cursor: "pointer" }}
                  >
                    <span>{stats.applications}</span>

                    <div className="contents-carsd">
                      <h4>Applications Sent</h4>
                      <p>
                        Connecting talent with opportunity.
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              {/* ================= TABLE ================= */}
              <div className="row mt-4">
                <div className="col-12">

                  <div className="dashboard-table">

                    <div className="table-header">
                      <h3>{getTableTitle()}</h3>

                      <span>
                        {tableData.length} Records
                      </span>
                    </div>

                    {loading ? (
                      <div className="text-center p-4">
                        Loading...
                      </div>
                    ) : tableData.length === 0 ? (
                      <div className="text-center p-4">
                        No data found.
                      </div>
                    ) : (

                      <div className="table-responsive">
                        <table className="table table-hover table-bordered">

                          {/* ================= USERS TABLE ================= */}
                          {selectedType === "users" && (
                            <>
                              <thead>
                                <tr>
                                  <th>ID</th>
                                  <th>First Name</th>
                                  <th>Last Name</th>
                                  <th>Email</th>
                                  <th>Phone</th>
                                  <th>Address</th>
                                  <th>City</th>
                                </tr>
                              </thead>

                              <tbody>
                                {tableData.map((item) => (
                                  <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>
                                      {item.firstname ||
                                        item.firstName ||
                                        "-"}
                                    </td>
                                    <td>
                                      {item.lastname ||
                                        item.lastName ||
                                        "-"}
                                    </td>
                                    <td>{item.email || "-"}</td>
                                    <td>{item.phone || "-"}</td>
                                    <td>{item.address || "-"}</td>
                                    <td>{item.city || "-"}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </>
                          )}

                          {/* ================= RESUMES TABLE ================= */}
                          {selectedType === "resumes" && (
                            <>
                              <thead>
                                <tr>
                                  <th>ID</th>
                                  <th>First Name</th>
                                  <th>Last Name</th>
                                  <th>Email</th>
                                  <th>Highest Degree</th>
                                  <th>Job Title</th>
                                  <th>Organization</th>
                                  <th>Technical Skills</th>
                                  <th>Summary</th>
                                </tr>
                              </thead>

                              <tbody>
                                {tableData.map((item) => (
                                  <tr key={item.id}>
                                    <td>{item.id}</td>

                                    <td>
                                      {item.firstname ||
                                        item.firstName ||
                                        "-"}
                                    </td>

                                    <td>
                                      {item.lastname ||
                                        item.lastName ||
                                        "-"}
                                    </td>

                                    <td>{item.email || "-"}</td>

                                    <td>
                                      {item.highestdegree ||
                                        item.highestDegree ||
                                        item.degree ||
                                        "-"}
                                    </td>

                                    <td>
                                      {item.jobtitle ||
                                        item.jobTitle ||
                                        "-"}
                                    </td>

                                    <td>
                                      {item.organizationname ||
                                        item.organizationName ||
                                        item.currentorganization ||
                                        "-"}
                                    </td>

                                    <td>
                                      {Array.isArray(item.technicalskill)
                                        ? item.technicalskill.join(", ")
                                        : item.technicalskill ||
                                          item.technicalSkill ||
                                          item.skills ||
                                          "-"}
                                    </td>

                                    <td>
                                      {item.summary || "-"}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </>
                          )}

                          {/* ================= APPLICATION TABLE ================= */}
                          {selectedType === "applications" && (
                            <>
                              <thead>
                                <tr>
                                  <th>ID</th>
                                  <th>Name</th>
                                  <th>Email</th>
                                  <th>Job Title</th>
                                  <th>Company</th>
                                  <th>Status</th>
                                  <th>Date</th>
                                </tr>
                              </thead>

                              <tbody>
                                {tableData.map((item) => (
                                  <tr key={item.id}>
                                    <td>{item.id}</td>

                                    <td>
                                      {item.name ||
                                        `${item.firstname || ""} ${
                                          item.lastname || ""
                                        }`}
                                    </td>

                                    <td>{item.email || "-"}</td>

                                    <td>
                                      {item.jobtitle ||
                                        item.jobTitle ||
                                        "-"}
                                    </td>

                                    <td>
                                      {item.company ||
                                        item.organization ||
                                        "-"}
                                    </td>

                                    <td>
                                      {item.status || "Pending"}
                                    </td>

                                    <td>
                                      {item.date ||
                                        item.createdAt ||
                                        "-"}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </>
                          )}

                        </table>
                      </div>
                    )}

                  </div>

                </div>
              </div>
            </div>

            {/* ================= PROFILE ================= */}
            <div className="col-lg-3">

              <div className="profile-user-main">

                <Image
                  src={Profile}
                  alt="Profile"
                />

                <main>
                  <h3>{user?.name}</h3>
                  <p>{user?.email}</p>

                  <button
                    className="btn"
                    onClick={logoutHandler}
                  >
                    Logout
                  </button>
                </main>

              </div>

            </div>

          </div>
        </div>
      </section>
    </>
  );
}