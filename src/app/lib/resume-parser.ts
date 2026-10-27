import mammoth from "mammoth";
import { PDFParse } from "pdf-parse";
import WordExtractor from "word-extractor";

export interface ExtractedExperience {
    jobtitle: string;
    organizationname: string;
    organizationlocation: string;
    datesemployment: string;
    usetechnology: string;
    responsibilitiesachievements: string;
}

export interface ExtractedResume {
    firstname?: string;
    lastname?: string;
    email?: string;
    phone?: string;
    fulladdress?: string;
    city?: string;
    country?: string;
    linkedinurl?: string;
    facebookurl?: string;
    twitterurl?: string;
    degreequalification?: string;
    degreeinstitutionname?: string;
    degreeinstitutionlocation?: string;
    degreepassingyears?: string;
    degreegradescgpa?: string;
    collageboardname?: string;
    collagename?: string;
    collagelocation?: string;
    collagecgpa?: string;
    collagepassingyears?: string;
    schoolboardname?: string;
    schoolname?: string;
    schoollocation?: string;
    schoolcgpa?: string;
    schoolpassingyears?: string;
    summary?: string;
    experiences?: ExtractedExperience[];
    technicalskills?: string[];
    languages?: string[];
    softwareItems?: string[];
}

const sectionHeading =
    /^(?:professional\s+)?(?:summary|profile|objective|about\s+me|skills|technical\s+skills|core\s+competencies|languages|software|education|academic\s+background|experience|work\s+experience|professional\s+experience|employment\s+history|projects|certifications|references)(?:\s*[:|])?$/i;

function cleanLines(text: string) {
    return text
        .replace(/\u0000/g, "")
        .replace(/\r/g, "\n")
        .split("\n")
        .map((line) => line.replace(/\s+/g, " ").trim())
        .filter(Boolean);
}

function findSection(lines: string[], heading: RegExp): string[] {
    const start = lines.findIndex((line) => heading.test(line));
    if (start < 0) return [];

    const firstLineContent = lines[start].replace(heading, "").replace(/^[:|\s-]+/, "").trim();
    const content = firstLineContent ? [firstLineContent] : [];
    for (let index = start + 1; index < lines.length; index += 1) {
        if (sectionHeading.test(lines[index])) break;
        content.push(lines[index]);
    }
    return content;
}

function splitItems(lines: string[]): string[] {
    return lines
        .flatMap((line) => line.split(/[,;|•●▪]+/))
        .map((item) => item.replace(/^[\s\-*]+|[\s\-*]+$/g, "").trim())
        .filter((item) => item.length > 1 && item.length < 60)
        .slice(0, 30);
}

function extractExperience(lines: string[]): ExtractedExperience[] {
    const experienceLines = findSection(
        lines,
        /^(?:(?:professional|work)\s+)?(?:experience|employment\s+history)(?:\s*[:|])?$/i
    );
    if (!experienceLines.length) return [];

    const datePattern =
        /(?:\b(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s+\d{4}\b|\b\d{1,2}[/-]\d{4}\b|\b\d{4}\b).{0,30}(?:present|current|(?:\b(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s+\d{4}\b|\b\d{1,2}[/-]\d{4}\b|\b\d{4}\b))?/i;
    const dateIndex = experienceLines.findIndex((line) => datePattern.test(line));
    if (dateIndex < 0) return [];

    const dateLine = experienceLines[dateIndex];
    const beforeDate = dateLine.replace(datePattern, "").replace(/[|–—-]+/g, " ").trim();
    const previous = experienceLines.slice(0, dateIndex).filter((line) => !/^[-*•]/.test(line));
    const afterDate = experienceLines.slice(dateIndex + 1);
    const title = beforeDate || previous[previous.length - 1] || "";
    const organization = previous.length > 1 ? previous[previous.length - 2] : "";

    return [{
        jobtitle: title,
        organizationname: organization,
        organizationlocation: "",
        datesemployment: dateLine.trim(),
        usetechnology: "",
        responsibilitiesachievements: afterDate
            .filter((line) => /^[-*•]/.test(line))
            .map((line) => line.replace(/^[-*•]\s*/, ""))
            .join("; "),
    }];
}

function extractEducation(lines: string[]): Partial<ExtractedResume> {
    const educationLines = findSection(
        lines,
        /^(?:education|academic\s+background)(?:\s*[:|])?$/i
    );
    if (!educationLines.length) return {};

    const qualificationPattern =
        /\b(?:bachelor|master|ph\.?d|doctor(?:ate)?|associate|diploma|b\.?tech|m\.?tech|b\.?sc|m\.?sc|b\.?a\.?|m\.?a\.?|mba|degree)\b/i;
    const qualification = educationLines.find((line) => qualificationPattern.test(line));
    const institution = educationLines.find((line) =>
        /\b(?:university|college|institute|school)\b/i.test(line)
    );
    const year = educationLines.find((line) => /\b(?:19|20)\d{2}\b/.test(line))?.match(/\b(?:19|20)\d{2}\b/)?.[0];
    const grade = educationLines.find((line) => /\b(?:cgpa|gpa|grade|score)\b/i.test(line));
    const result: Partial<ExtractedResume> = {};

    if (qualification) result.degreequalification = qualification;
    if (institution) result.degreeinstitutionname = institution;
    if (year) result.degreepassingyears = year;
    if (grade) result.degreegradescgpa = grade;
    return result;
}

export function extractResumeFields(text: string): ExtractedResume {
    const lines = cleanLines(text);
    const result: ExtractedResume = {};
    const email = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0];
    const phone = text.match(/(?:\+\s?\d{1,3}[\s.-]?)?(?:\(?\d{2,4}\)?[\s.-]?){2,4}\d{2,4}/)?.[0];
    if (email) result.email = email.toLowerCase();
    if (phone && phone.replace(/\D/g, "").length >= 7) result.phone = phone.trim();

    const nameCandidate = lines.slice(0, 8).find((line) => {
        const words = line.split(/\s+/);
        return (
            words.length >= 2 &&
            words.length <= 5 &&
            !/@|https?:|www\.|\d/.test(line) &&
            !sectionHeading.test(line) &&
            !/\b(resume|curriculum vitae|developer|engineer|manager|designer|professional)\b/i.test(line)
        );
    });
    if (nameCandidate) {
        const [firstname, ...lastName] = nameCandidate.split(/\s+/);
        result.firstname = firstname;
        result.lastname = lastName.join(" ");
    }

    const extractUrl = (pattern: RegExp) => text.match(pattern)?.[0]?.replace(/[),.;]+$/, "");
    const linkedin = extractUrl(/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/[^\s|,)]+/i);
    const facebook = extractUrl(/(?:https?:\/\/)?(?:www\.)?facebook\.com\/[^\s|,)]+/i);
    const twitter = extractUrl(/(?:https?:\/\/)?(?:www\.)?(?:x|twitter)\.com\/[^\s|,)]+/i);
    if (linkedin) result.linkedinurl = linkedin.startsWith("http") ? linkedin : `https://${linkedin}`;
    if (facebook) result.facebookurl = facebook.startsWith("http") ? facebook : `https://${facebook}`;
    if (twitter) result.twitterurl = twitter.startsWith("http") ? twitter : `https://${twitter}`;

    const addressLine = lines.find((line) => /^(?:address|location)\s*[:\-]\s*.+/i.test(line));
    if (addressLine) {
        result.fulladdress = addressLine.replace(/^(?:address|location)\s*[:\-]\s*/i, "");
    }

    const summary = findSection(
        lines,
        /^(?:professional\s+)?(?:summary|profile|objective|about\s+me)(?:\s*[:|])?$/i
    );
    if (summary.length) result.summary = summary.join(" ");

    const skills = findSection(
        lines,
        /^(?:(?:technical\s+)?skills|core\s+competencies)(?:\s*[:|])?$/i
    );
    if (skills.length) result.technicalskills = splitItems(skills);

    const languages = findSection(lines, /^languages?(?:\s*[:|])?$/i);
    if (languages.length) result.languages = splitItems(languages);
    const software = findSection(lines, /^software(?:\s+skills)?(?:\s*[:|])?$/i);
    if (software.length) result.softwareItems = splitItems(software);

    Object.assign(result, extractEducation(lines));
    result.experiences = extractExperience(lines);
    return result;
}

export async function extractResumeText(
    file: File,
    extension: string
): Promise<string> {
    const buffer = Buffer.from(await file.arrayBuffer());

    if (extension === ".pdf") {
        const parser = new PDFParse({ data: buffer });
        try {
            return (await parser.getText()).text;
        } finally {
            await parser.destroy();
        }
    }

    if (extension === ".docx") {
        return (await mammoth.extractRawText({ buffer })).value;
    }

    if (extension === ".doc") {
        const extractor = new WordExtractor();
        return (await extractor.extract(buffer)).getBody();
    }

    throw new Error("Upload a PDF, DOC, or DOCX resume.");
}
