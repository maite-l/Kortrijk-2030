import { Form } from 'react-router-dom';

export default function MyAccount() {
    return (
        <main>
            <h2>My Account</h2>
            <Form method="post" action="logout">
                <button type="submit">Log out</button>
            </Form>
        </main>
    );
}
