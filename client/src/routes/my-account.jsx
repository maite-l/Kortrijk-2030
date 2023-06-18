import { Form, useLoaderData } from "react-router-dom";
import { getSubmissonsByUserId } from "../submissions";
import { getUserInfoByUserId } from "../auth";

import "../css/my-account.css";

export async function loader() {
    const user = JSON.parse(localStorage.getItem("user"));
    const userInfo = await getUserInfoByUserId(user.id);
    const submissions = await getSubmissonsByUserId(user.id);
    console.log(submissions);
    const amountOfSubmissions = submissions.length;

    return {
        userInfo,
        amountOfSubmissions,
    };
}


export default function MyAccount() {
    const {
        userInfo,
        amountOfSubmissions,
    } = useLoaderData();

    let userLevel;
    if (amountOfSubmissions > 10) {
        userLevel = "Expert Voice";
    } else if (amountOfSubmissions >= 5 && amountOfSubmissions <= 10) {
        userLevel = "Active Contributor";
    } else {
        userLevel = "Promising Beginner";
    }

    return (
        <main>
            <div className="my-account">
                <div className="my-account__profile">
                    <p className="profile__name">{userInfo.fullName}</p>
                    <p className="profile__level">{userLevel}</p>
                </div>


                <div className="my-account__submissions">
                    <div className="my-account__number-of-submissions">
                        <p>Submissions</p>
                        <p>{amountOfSubmissions}</p>
                    </div>
                    <a href="">View my submissions</a>
                </div>

                <div className="my-account__actions">
                    <Form>
                        <label htmlFor="email">
                            <span>Email</span>
                            <input type='text' name='email' placeholder={userInfo.email} />
                        </label>
                        <label htmlFor="password">
                            <span>Password</span>
                            <input type='password' name='password' placeholder='********' />
                        </label>
                        <label htmlFor="city">
                            <span>City</span>
                            <input type='password' name='city' />
                        </label>
                    </Form>

                    <Form method="post" action="logout">
                        <button className="log-out" type="submit">Log out</button>
                    </Form>
                </div>




            </div>
        </main>
    );
}
