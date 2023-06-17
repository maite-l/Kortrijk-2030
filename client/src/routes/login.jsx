import { Form, redirect } from 'react-router-dom';
import { authenticate } from '../auth';

export async function action({ request }) {
    const formData = await request.formData();
    const { email, password } = Object.fromEntries(formData);
    const { jwt, user } = await authenticate(email, password);
    localStorage.setItem("jwt", jwt);
    localStorage.setItem("user", JSON.stringify(user));
    throw redirect("/");
}

export default function Login() {

    return (
        <main>
            <h2>Log in</h2>
            <p>Log in to your account below - we promise not to send you any spam emails (unless you want us to). It’s just so you can keep track of all your submissions and can easily post your contact info for them (if you want).</p>
            <Form method="post">
                <label htmlFor="email">
                    <span>Email</span>
                    <input type='text' name='email' placeholder='name@example.com'/>
                </label>
                <label htmlFor="password">
                    <span>Password</span>
                    <input type='password' name='password'/>
                </label>
                <button type='submit'>Log in</button>
            </Form>

            <p>I don't have an account <a href="/register">Sign up</a></p>
        </main>
    );

}