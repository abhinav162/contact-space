import { useState } from "react";

export function makeActive() {
    const currActive = document.getElementsByClassName('active');
    const currId = currActive[0].id

    const currPath = window.location.pathname.split('/')[1]
    console.log(currPath)

    if (currId !== currPath) {
        currActive[0].classList.remove('active');
        console.log(currPath)
        // document.getElementById(currPath).classList.add('active');
    }
}

export default makeActive;