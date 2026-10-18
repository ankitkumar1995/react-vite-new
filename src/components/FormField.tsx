import React, { useId } from "react";

interface FormFieldProps {
    label: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    required?: boolean;
    id?: string;
    errorId?: string;
}

export default function FormField({
    label,
    type = "text",
    value,
    onChange,
    error,
    required = false,
    id,
    errorId,
}: FormFieldProps) {
    const baseId = useId();
    const inputId = id ?? `${baseId}-input`;
    const describedById = errorId ?? `${baseId}-error`;
    // console.log(inputId, "inputId");
    // console.log(errorId, "errorId");

    return (
        <div style={{ marginBottom: "16px" }}>
            <label htmlFor={inputId} style={{ display: "block" }}>
                {label} {required && "*"}
            </label>

            <input
                id={inputId}
                type={type}
                value={value}
                onChange={onChange}
                aria-invalid={!!error}
                aria-describedby={error ? describedById : undefined}
                style={{
                    border: error ? "1px solid red" : "1px solid #ccc",
                    padding: "8px",
                    width: "100%",
                }}
            />

            {error && (
                <p
                    id={describedById}
                    style={{ color: "red", fontSize: "14px", marginTop: "4px" }}
                >
                    {error}
                </p>
            )}
        </div>
    );
}