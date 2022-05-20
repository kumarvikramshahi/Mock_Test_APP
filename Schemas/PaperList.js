const PaperSchema = {
    name: "PaperList",
    properties: {
        _id: "string",
        exam_type: "string",
        name: "string",
        max_marks: "int",
        is_previous_year: "boolean",
        year: "int",
        instructions: "string",
        subjects: ["string"],
        questions: [
            {
                q: "string",
                options: ["string"],
                answer: "int",
                max_marks: "int",
                subject: "string"
            }
        ],
        is_Public: "boolean",
    },
    primaryKey: "_id"
};

export default PaperSchema;