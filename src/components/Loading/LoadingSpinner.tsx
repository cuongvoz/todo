import React from "react";
import styles from "./Loading.module.scss";

export function LoadingSpinner() {
    return (
        <div className={styles.spinner_bg}>
            <div className={styles.spinner_container}>
                <div className={styles.loading_spinner}>
                </div>
            </div>
        </div>
    );
}

export function LoadingSpinnerNew() {
    return (
        <div className={styles.lds_spinner}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    );
}