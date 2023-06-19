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
                    <a href="/my-submissions">View my submissions</a>
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

                <svg className="scribble scribble1" width="69" height="70" viewBox="0 0 69 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 64.6173C16.9989 64.6173 29.8496 65.9254 41.6995 63.7049C42.7546 63.5072 35.99 60.1607 35.3547 59.8274C28.5303 56.2476 21.7407 52.6692 14.8139 49.2898C13.8169 48.8033 10.9489 48.5855 11.8013 47.8756C12.6219 47.1922 16.5336 47.9097 17.3244 47.9669C29.6757 48.8592 42.0068 50.1418 54.3891 50.5671C57.2185 50.6642 60.0488 50.6583 62.8792 50.6583C63.5017 50.6583 64.6904 50.8815 63.4726 50.4758C55.4819 47.8139 49.2554 40.0179 44.1872 33.7114C43.6692 33.0669 36.4522 22.4618 36.5871 22.4438C38.1901 22.2302 41.156 23.4956 42.6352 23.8124C46.8032 24.7049 50.9545 25.6674 55.1194 26.5722C57.6493 27.1219 64.9971 29.1531 62.788 27.8039C59.7771 25.9651 56.9645 23.6511 54.6401 20.9841C51.3607 17.2211 60.5241 20.1724 59.8666 19.2962C57.037 15.5257 54.0352 12.1409 52.3122 7.66376C50.8213 3.7899 53.572 5.19324 56.7627 5.49693" stroke="#FF5714" strokeWidth="10" strokeLinecap="round" />
                </svg>
                <svg className="scribble scribble2" width="202" height="58" viewBox="0 0 202 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M70.6084 6.49468C70.8009 5.74534 65.1971 5.8744 65.1439 5.87442C52.6825 5.87804 40.0418 7.50247 27.8066 9.82443C27.0962 9.95924 3.66445 14.861 5.46368 17.6263C6.95978 19.9258 13.3567 21.011 15.4989 21.5338C35.0765 26.3127 55.5044 26.4416 75.5469 25.9884C92.2538 25.6106 108.952 24.4746 125.667 24.6469C130.173 24.6934 135.782 24.2008 140.034 26.0856C141.334 26.6623 140.811 26.8363 139.642 26.9994C132.782 27.9564 125.924 28.3172 119.092 29.6609C112.975 30.864 106.463 32.2628 100.997 35.4211C100.133 35.9201 95.6983 38.6784 96.6366 40.2526C97.0814 40.9989 98.4286 41.4884 99.1212 41.7984C102.031 43.1005 105.058 44.1696 108.093 45.1329C121.1 49.26 134.883 52.0417 148.531 52.7497C165.021 53.6053 182.024 50.9822 196.532 42.7461" stroke="#FF5714" strokeWidth="10" strokeLinecap="round" />
                </svg>

            </div>
        </main>
    );
}
