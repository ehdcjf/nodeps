class Node {
        constructor(item) {
                this.item = item;
                this.front = null;
                this.rear = null;
        }
}

class Dequeue {
        constructor() {
                this.head = null;
                this.tail = null;
                this.length = 0;
        }

        push(item) {
                const node = new Node(item);
                if (this.head == null) {
                        this.head = node;
                } else {
                        this.tail.rear = node;
                }

                this.tail = node;
                this.length += 1;
        }

        pop() {
                const popItem = this.tail;
                this.tail = this.tail.front;
                this.length -= 1;
                return popItem.item;
        }

        unshift(item){
                const node = new Node(item);
                if (this.head == null) {
                        this.tail = node;
                } else {
                        this.head.front = node;
                }

                this.head = node;
                this.length += 1;
        }

        shift(){
                const shiftItem = this.head;
                this.head = this.head.rear;
                this.length -= 1;
                return shiftItem.item;
        }

}