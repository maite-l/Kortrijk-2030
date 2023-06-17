import { Form, redirect } from 'react-router-dom';
import { register } from '../auth';

import "../css/auth.css";

export async function action({ request }) {
    const formData = await request.formData();
    const { email, name, password } = Object.fromEntries(formData);
    console.log(email, name, password);
    const { jwt, user } = await register(email, name, password);
    localStorage.setItem("jwt", jwt);
    localStorage.setItem("user", JSON.stringify(user));
    throw redirect("/");
}

export default function Register() {

    return (
        <main>
            <div className='auth-wrapper'>
                <h2>Sign up</h2>
                <p>Make your account below - we promise not to send you any spam emails (unless you want us to). It’s just so you can keep track of all your submissions and can easily post your contact info for them (if you want).</p>
                <Form method="post">
                    <label htmlFor="name">
                        <span>Full name</span>
                        <input type='text' name='name' placeholder='John Doe' />
                    </label>
                    <label htmlFor="email">
                        <span>Email</span>
                        <input type='text' name='email' placeholder='name@example.com' />
                    </label>
                    <label htmlFor="password">
                        <span>Password</span>
                        <input type='password' name='password' placeholder='at least 8 characters' />
                    </label>
                    <button className='auth-button' type='submit'>Sign up</button>
                </Form>

                <p>I already have an account <a href="/login">Log in</a></p>
            </div>
        </main>
    )

}