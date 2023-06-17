import { redirect } from "react-router-dom";

export async function action() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    return redirect("/login");
}
