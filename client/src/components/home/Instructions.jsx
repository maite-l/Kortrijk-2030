import CustomButton from "../CustomButton";

export default function Instructions({ openModal }) {
    return (
        <div className="instructions">
            <svg className="scribble" width="1433" height="181" viewBox="0 0 1433 181" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M-3 151.009C-2.46871 156.55 25.9286 152.403 28.1381 152.17C48.5374 150.014 66.9809 145.79 82.5019 134.897M82.5019 134.897C90.8854 129.014 100.337 121.542 104.942 109.5C120.5 68.8166 58.5021 65.6523 63.9067 96.4036C66.1747 109.308 73.465 123.58 82.5019 134.897ZM82.5019 134.897C90.4185 144.812 99.6755 153.367 108.071 159.249C128.305 173.426 154.682 178.386 178.273 174.237C207.096 169.168 234.456 141.491 254.632 119.057M254.632 119.057C255.231 118.391 254.046 119.713 254.632 119.057ZM254.632 119.057C272 105 294.595 91.518 297 67C297.839 58.4435 294.5 41.8121 280.954 41.8121C270.962 41.9626 262.375 48.5125 257.854 58.4435C250.595 74.3894 247.944 96.4966 252.745 113.525C253.289 115.454 253.92 117.297 254.632 119.057ZM254.632 119.057C262.79 139.222 281.526 148.612 300.282 154.528C344.024 168.324 398.23 149.469 431.91 115.244M431.91 115.244C434.169 112.948 436.337 110.582 438.402 108.152C444.792 100.637 480.5 56.5 451.5 47.5C431.91 43 423.428 50.8686 421.095 75.9274C419.62 91.7665 424.055 104.773 431.91 115.244ZM431.91 115.244C448.11 136.843 478.857 147.655 502.284 150.293C541.873 154.752 583.761 140.053 614.837 111.301M614.837 111.301C622.674 104.05 629.824 95.9056 636.075 86.9491C640.515 80.588 648.503 65.3752 641.745 57.6056C634.368 49.1228 630 43 613 43C596.998 43 594.085 59.2676 592.5 68.5C590.698 79 600.786 90.0927 610.504 104.958C611.923 107.129 613.368 109.243 614.837 111.301ZM614.837 111.301C647.409 156.904 692.184 174.575 744.904 166.671C765.451 163.59 783.172 153.912 796.419 139.417M796.419 139.417C811.724 122.67 828.18 112.355 829 85.5C829.63 64.8778 797.254 59.1777 790 69C772.806 92.2816 777.403 120.634 796.419 139.417ZM796.419 139.417C798.893 141.86 801.747 144.191 805.001 146.39C822.996 158.549 845.524 163.276 866.213 165.92C901.272 170.4 932.315 152.906 962.16 134.23C963.817 133.193 965.595 132.114 967.453 130.986M967.453 130.986C982.188 122.042 1001.92 110.037 1005.67 91.7657C1009.07 75.1514 1000.14 58.9932 988.028 49.8323C968.486 35.049 950.854 49.834 941.5 69C935.985 80.2992 936.698 95.5917 941.5 108C944.959 116.937 957.377 130.138 967.453 130.986ZM967.453 130.986C970.769 131.265 973.825 131.381 976.215 131.515C1028.09 134.423 1075.59 117.729 1118 84M1118 84C1119.64 82.6969 1126.87 78.429 1128.48 77.0843C1138.89 68.3665 1164.71 37.656 1147 21C1125 5 1110.18 31.6575 1106 39.5C1099.79 51.1611 1110.89 73.4438 1118 84ZM1118 84C1122.87 92.9438 1127.16 97.3066 1133.51 104.749C1156.79 132.009 1190.11 136.85 1222.44 137.376M1223.14 137.5C1268.32 137.5 1314.78 122.734 1336.32 82.9284M1336.32 82.9284C1339.02 77.9266 1341.33 72.5294 1343.2 66.7164C1347.19 54.2963 1351.13 35.2524 1346.61 22.4098C1343.51 13.6013 1332.8 12.5 1326 12.5C1319.2 12.5 1311.5 21.5 1308.5 27C1305.5 32.5 1305 39 1305 44.5C1304 61 1323.73 72.5556 1336.32 82.9284ZM1336.32 82.9284C1339.66 85.6822 1343.15 88.2268 1346.61 90.5738C1377.54 111.584 1411.4 119.222 1448.6 118.975C1465.99 118.86 1477.9 115.032 1482.68 97.1377C1488.91 73.8588 1486.34 48.1328 1486.34 24.3033C1486.34 18.9867 1487.78 11.2399 1486.28 6" stroke="#FF5714" stroke-width="10" stroke-linecap="round" />
            </svg>
            <h2 className="title--style2">How does it work?</h2>
            <div className="instructions__wrapper">
                <div className="instructions__steps">
                    <div className="instructions__step">
                        <div>
                            <h3><span>01.</span> Submit your work</h3>
                            <p className="instructions__text">You can contribute to various sections: articles, interviews, local gossip, memes, photography, artworks and open submissions.</p>
                        </div>
                        <CustomButton className="instructions__button" text={"Submit your input"} icon={"arrow"} href={'/submit'} />
                    </div>
                    <div className="instructions__step">
                        <div>
                            <h3><span>02.</span> Wait for approval</h3>
                            <p className="instructions__text">We manually go through all the submissions and moderate them, so that they fit the curation of the magazine.</p>
                            <p className="instructions__text">You can check the status of your submission if you create an account.</p>
                        </div>
                        <CustomButton className="instructions__button" text={"Make an account"} icon={"arrow"} href={'/register'} />
                    </div>
                    <div className="instructions__step">
                        <div>
                            <h3><span>03.</span> Admire your work</h3>
                            <p className="instructions__text">After your submission has been approved, it will be added to the upcoming issue and published in the beginning of next month - both in the digital and printed version of <span className="italic">klinkt.</span></p>
                        </div>
                        <div onClick={openModal}>
                            <CustomButton className="instructions__button" text={"View recent issue"} icon={"arrow"} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}