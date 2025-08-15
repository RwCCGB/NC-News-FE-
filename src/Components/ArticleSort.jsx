import { useCallback } from "react"

const sort_values = [
    {value: "created_at", label: "Date"},
    {value: "comment_count", label: "Comments"},
    {value: "votes", label: "Votes"}
]

export default function SortValues({sort_by, order, onChange}){
    const handleSort = useCallback((e) => onChange({sort_by: e.target.value}), [onChange])
    const handleOrder = useCallback(() => onChange({order: order === "asc" ? "desc" : "asc"}), [order, onChange])

    return (
        <div className="sort-controls" role="region" aria-label="Sorting Options">
            <label className="sort-label">
                Sort By{" "}
                <select value={sort_by} onChange={handleSort} aria-label="Sort by">
                    {sort_values.map((options) =>(
                        <option key={options.value} value={options.value}>{options.label}</option>
                    ))}
                </select>
            </label>
            <button type="button" className="pill" onClick={handleOrder}>
                {order?.toUpperCase()}
            </button>
        </div>
)}
