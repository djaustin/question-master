const config = {
    defaultQuestion: "How are you finding the system's performance today?",
    defaultEmailAddress: "hello@outlook.com",
    defaultEmailSubject: "Negative Feedback Received",
    defaultEmailTemplate: 
    `<p>Feedback has been received:</p>
    <ul>
        <li>Score:&nbsp;<strong>{{score}}</strong></li>
        <li>Comment:&nbsp;<strong>{{comment}}</strong></li>
        <li>Username:&nbsp;<strong>{{username}}</strong></li>
    </ul>;`,
}

export default config