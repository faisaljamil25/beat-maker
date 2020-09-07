class Drumkit {
    constructor() {
        this.pads = document.querySelectorAll(".pad");
        this.playBtn = document.querySelector(".play");
        this.kickAudio = document.querySelector(".kick-sound");
        this.snareAudio = document.querySelector(".snare-sound");
        this.hihatAudio = document.querySelector(".hihat-sound");
        this.index = 0;
        this.bpm = 200;
        this.isPlaying = null;
        this.selects = document.querySelectorAll("select");
    }
    activePad() {
        this.classList.toggle("active");
    }
    repeat() {
        if (this.index % 8 === 0) {
            this.index = 0;
        }
        let activePads = document.querySelectorAll(`.b${this.index}`);
        // Loop over the pads
        activePads.forEach(pad => {
            pad.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
            // Check if pads are active
            if (pad.classList.contains("active")) {
                // Check each sound
                if (pad.classList.contains("kick-pad")) {
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();
                }
                if (pad.classList.contains("snare-pad")) {
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                }
                if (pad.classList.contains("hihat-pad")) {
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play();
                }
            }
        });
        this.index++;
    }
    start() {
        const interval = (60 / this.bpm) * 1000;
        // Check if it's playing
        if (this.isPlaying) {
            // Clear the interval
            clearInterval(this.isPlaying);
            console.log(this.isPlaying);
            this.isPlaying = null;

        } else {
            this.isPlaying = setInterval(() => {
                this.repeat();
            }, interval);
        }
    }
    updateBtn() {
        if (!this.isPlaying) {
            this.playBtn.innerText = "Stop";
            this.playBtn.classList.add("active");
        } else {
            this.playBtn.innerText = "Play";
            this.playBtn.classList.remove("active");

        }
    }
    changeSound(event) {
        const selectionName = event.target.name;
        const selectionValue = event.target.value;
        switch (selectionName) {
            case "kick-select":
                this.kickAudio.src = selectionValue;
                break;
            case "snare-select":
                this.snareAudio.src = selectionValue;
                break;
            case "hihat-select":
                this.hihatAudio.src = selectionValue;
                break;
        }
    }
}

const drumkit = new Drumkit();

// EVENT LISTNERS

drumkit.selects.forEach(select => {
    select.addEventListener("change", function (event) {
        drumkit.changeSound(event);
    })
})

drumkit.pads.forEach(pad => {
    pad.addEventListener("click", drumkit.activePad);
    pad.addEventListener("animationend", function () {
        this.style.animation = "";
    })
})

drumkit.playBtn.addEventListener("click", function () {
    drumkit.updateBtn();
    drumkit.start();
})
