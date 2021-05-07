import "phaser";

export default class InputScene extends Phaser.Scene {
    constructor() {
        super("Input");
    }

    create() {
        const { height, width } = this.game.config;

        this.background = this.add
            .tileSprite(0, height, 0, 0, "background")
            .setOrigin(0, 1);
        this.add.text(width * 0.45, height * 0.1, 'Register', {
            color: "#0b6623",
            fontFamily: "Itim, cursive",
            fontSize: "40px",
            fontStyle: "bolder",
        }).setOrigin(0.1);
        const element = document.getElementById('name-form');
        element.style.display = 'block';


        element.addEventListener('click', (event) => {
            if (event.target.name === 'saveNameBtn') {
                const inputName = document.getElementById('name');


                if (inputName.value !== '') {
                    element.style.display = 'none';
                    scoreData.nameSetter(inputName.value);
                    this.scene.start('Game');
                } else {
                    const warning = document.getElementById('warning');
                    warning.style.display = 'block';

                    setInterval(() => {
                        warning.style.display = 'none';
                    }, 3000);
                }
            } else if (event.target.name === 'back') {
                element.style.display = 'none';
                this.scene.start('Title');
            }
        });
    }

    update() {
        this.background.tilePositionX += 5;
    }
}
