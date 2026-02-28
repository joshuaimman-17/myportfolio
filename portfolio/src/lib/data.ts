import fs from 'fs';
import path from 'path';

export interface AboutData {
    profileImage: string;
    name: string;
    role: string;
    bio: string;
    resume: string;
}

export interface ProjectData {
    id: number;
    title: string;
    description: string;
    tech: string[];
    github?: string;
    demo?: string;
}

export interface SkillData {
    name: string;
    level: string;
}

export interface ContactData {
    email: string;
    phone: string;
    linkedin: string;
    github: string;
}

const DATA_DIR = path.join(process.cwd(), 'src/data');

export async function getAboutData(): Promise<AboutData> {
    const filePath = path.join(DATA_DIR, 'about.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent);
}

export async function getProjectsData(): Promise<ProjectData[]> {
    const filePath = path.join(DATA_DIR, 'projects.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent);
}

export async function getSkillsData(): Promise<SkillData[]> {
    const filePath = path.join(DATA_DIR, 'skills.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent);
}

export async function getContactData(): Promise<ContactData> {
    const filePath = path.join(DATA_DIR, 'contact.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent);
}
