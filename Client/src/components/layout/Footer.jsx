import React from 'react';

import styles from './../css/Footer.module.css'

const Footer = () => {
    return ( 
        <footer>
            <div className={styles.social_list}>
                <a href="">
                    Facebook
                </a>
                <a href="">Instagram</a>
                <a href="">Twitter</a>
            </div>
            <p className={styles.copyright}>
                <span>Costs</span> &copy; 2022
            </p>
            <p className={styles.creator}>Created by <a href="http://pedrozle.github.io">Pedro Silveira</a></p>
        </footer> 
    );
}
 
export default Footer;
