import React from "react";
import styles from "./Loading.module.scss";

export default function LoadingSpinner() {
    return (
        <div className={styles.spinner_bg}>
            <div className={styles.spinner_container}>
                <div className={styles.loading_spinner}>
                </div>
            </div>
        </div>
    );
}