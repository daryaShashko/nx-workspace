export type FormData = {
    releaseDate: string | null;
    title: string;
    genre: string;
    description: string;
    duration: string;
};

export type AddOrEditFilmFormProps = Partial<FormData> & {
    onSave: (data: Partial<FormData>) => void;
    onCancel: (data: Partial<FormData>) => void;
};
