export class Poll {
    constructor(
        public question: String = "",
        public option1: String = "",
        public option1Votes: Number = 0,
        public option2: String = "",
        public option2Votes: Number = 0,
        public option3: String = "",
        public option3Votes: Number = 0,
        public option4: String = "",
        public option4Votes: Number = 0,
        public user_id: String = "",
        public user_name: String = ""
    ) {}
}
