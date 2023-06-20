import { Form, redirect } from 'react-router-dom';
import { register } from '../util/auth';

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
            <div className='auth-wrapper register'>
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
                <svg className='scribble scribble1' width="57" height="97" viewBox="0 0 57 97" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M37.2908 91.6377C28.5497 82.9353 18.1211 74.6867 11.2999 64.2731C10.6925 63.3458 18.3502 65.5101 19.0849 65.6978C26.9765 67.7143 34.8417 69.7067 42.6444 71.9616C43.7675 72.2861 46.0345 74.1876 45.9926 72.9879C45.9523 71.8327 42.5174 69.5836 41.8947 69.0568C32.1691 60.8299 22.1397 52.9374 12.7725 44.3053C10.632 42.3329 8.57504 40.2753 6.51307 38.2224C6.05964 37.771 5.01159 37.0917 6.22963 37.6425C14.2221 41.2569 25.1175 39.3853 33.954 37.894C34.857 37.7416 48.7653 34.2867 48.6817 34.1742C47.6882 32.8366 44.4954 31.7222 43.1594 30.9089C39.395 28.6174 35.5858 26.3951 31.8135 24.1157C29.5222 22.7312 22.5125 19.0663 25.2224 19.5631C28.9157 20.2402 32.8522 20.3842 36.7211 19.8848C42.1796 19.1801 33.0968 14.9522 34.2905 14.7112C39.4275 13.6742 44.3753 13.0779 49.2826 10.6593C53.5287 8.56661 50.3801 7.72143 47.808 5.65613" stroke="#FF5714" stroke-width="10" stroke-linecap="round" />
                </svg>
                <svg className='scribble scribble2' width="155" height="187" viewBox="0 0 155 187" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M72.732 5C72.732 6.15513 72.085 7.19986 71.573 8.20585C67.313 16.5749 61.7423 24.3561 56.1623 31.8864C48.6406 42.0371 40.5995 51.634 32.1448 61.0168C27.2728 66.4236 22.6832 72.0872 18.5156 78.0506C14.9668 83.1284 11.1663 87.5609 6.75368 91.8571C6.39064 92.2105 4.35163 94.167 5.20832 94.9347C6.30289 95.9156 11.8402 92.4149 12.5917 92.0281C18.8072 88.8286 24.48 84.9473 29.977 80.658C30.5357 80.222 39.6542 72.1355 40.5799 74.7165C41.3912 76.9786 39.5839 80.5921 38.7984 82.5388C34.2653 93.7733 28.6152 104.627 23.3663 115.538C16.6227 129.556 7.00236 144.063 5.59466 159.949C5.47623 161.286 5.23222 163.081 5.53027 164.416C5.6304 164.865 6.30178 164.513 6.58197 164.737C6.87164 164.967 6.97773 165.403 7.37612 165.1C14.2634 159.856 22.0159 155.661 29.7194 151.742C39.6671 146.682 49.911 141.559 60.5193 138C60.6257 137.964 65.6394 136.318 65.3057 136.953C65.0166 137.502 64.2177 138.122 63.8247 138.513C60.8544 141.471 58.2364 144.634 55.7974 148.045C49.3925 157.003 43.2835 166.236 37.1458 175.38C36.829 175.852 32.9688 180.849 33.5614 181.557C34.0847 182.182 35.4411 181.963 36.1155 181.963C47.9095 181.963 59.6033 180.401 71.2725 178.8C88.8062 176.393 106.428 173.843 123.428 168.797C128.536 167.281 133.697 165.905 138.71 164.096C142.53 162.717 146.046 161.328 150 160.419" stroke="#FF5714" stroke-width="10" stroke-linecap="round" />
                </svg>

            </div>
        </main>
    )

}