import kortrijkLogo from '../assets/img/kortrijk-logo.png';

import "../css/footer.css";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="socials">
                <a href="">
                    <svg width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M45.3639 0H2.64833C1.94595 0 1.27234 0.284712 0.775679 0.791502C0.27902 1.29829 0 1.98565 0 2.70236V46.2935C0 47.0102 0.27902 47.6976 0.775679 48.2043C1.27234 48.7111 1.94595 48.9958 2.64833 48.9958H25.6359V30.0253H19.3858V22.6291H25.6359V17.1745C25.6359 10.8469 29.425 7.40031 34.958 7.40031C36.8251 7.39351 38.6912 7.49066 40.548 7.69133V14.3059H36.7222C33.7112 14.3059 33.1286 15.7651 33.1286 17.9062V22.6291H40.3035L39.3705 30.0253H33.1286V49H45.3517C46.0537 48.9989 46.7267 48.7138 47.2231 48.2073C47.7196 47.7007 47.9989 47.014 48 46.2976V2.70652C48.0011 1.99124 47.7242 1.3047 47.2301 0.797371C46.7359 0.290039 46.0649 0.00330041 45.3639 0Z" fill="#030027" />
                    </svg>
                </a>
                <a href="">
                    <svg width="51" height="51" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.8198 0.083374H36.1698C44.3031 0.083374 50.9115 6.69171 50.9115 14.825V36.175C50.9115 40.0848 49.3583 43.8344 46.5937 46.599C43.8291 49.3636 40.0795 50.9167 36.1698 50.9167H14.8198C6.68646 50.9167 0.078125 44.3084 0.078125 36.175V14.825C0.078125 10.9153 1.63126 7.16571 4.39586 4.40111C7.16046 1.63651 10.9101 0.083374 14.8198 0.083374ZM14.3115 5.16671C11.8847 5.16671 9.55739 6.13072 7.84143 7.84668C6.12547 9.56264 5.16146 11.89 5.16146 14.3167V36.6834C5.16146 41.7413 9.25354 45.8334 14.3115 45.8334H36.6781C39.1049 45.8334 41.4322 44.8694 43.1482 43.1534C44.8641 41.4374 45.8281 39.1101 45.8281 36.6834V14.3167C45.8281 9.25879 41.736 5.16671 36.6781 5.16671H14.3115ZM38.8385 8.97921C39.6812 8.97921 40.4893 9.31393 41.0851 9.90975C41.6809 10.5056 42.0156 11.3137 42.0156 12.1563C42.0156 12.9989 41.6809 13.807 41.0851 14.4028C40.4893 14.9986 39.6812 15.3334 38.8385 15.3334C37.9959 15.3334 37.1878 14.9986 36.592 14.4028C35.9962 13.807 35.6615 12.9989 35.6615 12.1563C35.6615 11.3137 35.9962 10.5056 36.592 9.90975C37.1878 9.31393 37.9959 8.97921 38.8385 8.97921ZM25.4948 12.7917C28.8652 12.7917 32.0977 14.1306 34.4809 16.5139C36.8642 18.8972 38.2031 22.1296 38.2031 25.5C38.2031 28.8705 36.8642 32.1029 34.4809 34.4862C32.0977 36.8695 28.8652 38.2084 25.4948 38.2084C22.1243 38.2084 18.8919 36.8695 16.5086 34.4862C14.1254 32.1029 12.7865 28.8705 12.7865 25.5C12.7865 22.1296 14.1254 18.8972 16.5086 16.5139C18.8919 14.1306 22.1243 12.7917 25.4948 12.7917ZM25.4948 17.875C23.4725 17.875 21.5331 18.6784 20.1031 20.1083C18.6731 21.5383 17.8698 23.4778 17.8698 25.5C17.8698 27.5223 18.6731 29.4618 20.1031 30.8917C21.5331 32.3217 23.4725 33.125 25.4948 33.125C27.5171 33.125 29.4565 32.3217 30.8865 30.8917C32.3164 29.4618 33.1198 27.5223 33.1198 25.5C33.1198 23.4778 32.3164 21.5383 30.8865 20.1083C29.4565 18.6784 27.5171 17.875 25.4948 17.875Z" fill="#030027" />
                    </svg>
                </a>
                <a href="">
                    <svg width="41" height="47" viewBox="0 0 41 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.5416 0.0396563C24.1046 0 26.6529 0.0235 29.1982 0C29.3524 2.99772 30.4305 6.05125 32.6248 8.17066C34.8147 10.3429 37.9123 11.3373 40.9262 11.6736V19.5593C38.1018 19.4668 35.2641 18.8793 32.7012 17.6632C31.5849 17.1579 30.5451 16.5073 29.5272 15.8419C29.514 21.5642 29.5507 27.2791 29.4905 32.9778C29.3377 35.7156 28.4345 38.4401 26.8423 40.6961C24.2808 44.4517 19.8349 46.9001 15.2686 46.9765C12.4677 47.1366 9.66971 46.3728 7.28299 44.9658C3.32765 42.6334 0.544364 38.3638 0.138989 33.7812C0.0879276 32.8107 0.0800865 31.8385 0.115489 30.8673C0.467989 27.141 2.31127 23.5764 5.1724 21.1515C8.4154 18.3271 12.9582 16.9817 17.2117 17.7778C17.2514 20.6785 17.1354 23.5764 17.1354 26.4772C15.1922 25.8485 12.9215 26.0248 11.2236 27.2042C9.98144 28.0225 9.0427 29.2265 8.55199 30.6308C8.14661 31.6237 8.26265 32.7267 8.28615 33.7812C8.75174 36.9949 11.842 39.6959 15.1408 39.4036C17.3278 39.3801 19.4237 38.1111 20.5634 36.2532C20.9321 35.6025 21.3448 34.9372 21.3668 34.1719C21.5592 30.669 21.4829 27.1807 21.5064 23.6777C21.5225 15.7832 21.4829 7.91069 21.5431 0.041125L21.5416 0.0396563Z" fill="#030027" />
                    </svg>
                </a>
            </div>
            <p>© 2023 klinkt. magazine kortrijk </p>
            <a href="" className='kortrijk-logo'>
                <img src={kortrijkLogo} alt="kortrijk logo" />
            </a>

        </footer>
    )
}