import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface DiaryEntry {
    date: string;
    mood: string;
    reflection: string;
}
export interface backendInterface {
    addDiaryEntry(date: string, mood: string, reflection: string): Promise<void>;
    getAllMotivationalMessages(): Promise<Array<string>>;
    getMyEntries(): Promise<Array<DiaryEntry>>;
}
