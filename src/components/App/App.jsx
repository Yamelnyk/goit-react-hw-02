// import { useState, useEffect } from "react";
import { useState, useEffect } from "react";
import Description from "../Description/Description";
import Options from "../Options/Options";
import Feedback from "../Feedback/Feedback";
import Notification from "../Notification/Notification";



export default function App() {
   
    const [feedback, setFeedback] = useState(() => {
        const savedFeedback = window.localStorage.getItem("saved-feedback");
        if (savedFeedback !== null) {
            return JSON.parse(savedFeedback);
        }
        return {
            good: 0,
            neutral: 0,
            bad: 0
        };
    });

   useEffect(() => { window.localStorage.setItem("saved-feedback", JSON.stringify(feedback)); }, [feedback]);

    const updateFeedback = feedbackType => {
        setFeedback({
            ...feedback,
            [feedbackType]: feedback[feedbackType] + 1
        });
    }

    const totalFeedback = feedback.good + feedback.neutral + feedback.bad;

    const positiveFeedback = Math.round((feedback.good / totalFeedback) * 100)


    const handleReset = () => {
        setFeedback({
        good: 0,
        neutral: 0,
        bad: 0
    })
    }
    
   
    return (
        <div>
            <Description />
            <Options updateFeedback={updateFeedback} totalFeedback={totalFeedback} resetFeedback={handleReset} />
            {totalFeedback > 0 ? <Feedback feedback={feedback} totalFeedback={totalFeedback} positiveFeedback={positiveFeedback} /> : <Notification/> }
        </div>
    )  
}
