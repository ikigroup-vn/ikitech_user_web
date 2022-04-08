export const getBranchId = () => {
    return localStorage.getItem("branch_id")
}

export const setBranchId = (id) => {
    localStorage.setItem("branch_id", id);
}
