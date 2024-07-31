window.addEventListener('load', function() {
    const canvas = this.document.getElementById('fox-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = 128;

    const State = {
        idle1: 0,
        idle2: 1,
        moveRight: 2,
        moveLeft: 3,
        sleep: 4
    };

    class Fox {
        constructor(canvasWidth, canvasHeight){
            this.image = document.getElementById('fox');
            this.canvasWidth = canvasWidth;
            this.canvasHeight = canvasHeight;
            this.spriteWidth = 128;
            this.spriteHeight = 128;
            this.width = this.spriteWidth;
            this.height = this.spriteHeight;
            this.scale = 1;
            this.x = this.canvasWidth / 2 - this.width * this.scale / 2;
            this.y = this.canvasHeight / 2 - this.height * this.scale / 2;
            this.state = State.idle1; // Default state
            this.frames = [5, 14, 8, 8, 6]; // Frames per state
            this.currentFrame = 0;
            this.moveSpeed = 5;
        }
        draw(context){
            context.drawImage(
                this.image, 
                this.currentFrame * this.spriteWidth, 
                this.state * this.spriteHeight, 
                this.spriteWidth, 
                this.spriteHeight, 
                this.x, 
                this.y, 
                this.width * this.scale, 
                this.height * this.scale
            );
        }
        update(){
            this.currentFrame++;
            if (this.currentFrame >= this.frames[this.state]) {
                this.currentFrame = 0;
            }

            if (this.state === State.moveRight) {
                if (this.x + this.width * this.scale < this.canvasWidth) {
                    this.x += this.moveSpeed;
                } else {
                    this.changeState(State.moveLeft); // Change direction at right edge
                }
            } else if (this.state === State.moveLeft) {
                if (this.x > 0) {
                    this.x -= this.moveSpeed;
                } else {
                    this.changeState(State.moveRight); // Change direction at left edge
                }
            }
        }
        changeState(newState) {
            this.state = newState;
            this.currentFrame = 0;
        }
    }

    const fox = new Fox(canvas.width, canvas.height);

    let lastTime = 0;
    const fps = 12; // Set the desired frames per second
    const frameInterval = 1000 / fps;

    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        if (deltaTime > frameInterval) {
            lastTime = timeStamp;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            fox.draw(ctx);
            fox.update();
        }
        requestAnimationFrame(animate);
    }

    function randomStateChange() {
        const randomTime = Math.random() * (4000 - 3000) + 3000; // Random time between 3s and 4s
        setTimeout(() => {
            let newState = Math.floor(Math.random() * Object.keys(State).length);
            // Avoid repeating the same state twice in succession
            while (newState === fox.state) {
                newState = Math.floor(Math.random() * Object.keys(State).length);
            }
            fox.changeState(newState);
            randomStateChange(); // Recursively call to continue changing states
        }, randomTime);
    }

    randomStateChange();
    animate(0);
})