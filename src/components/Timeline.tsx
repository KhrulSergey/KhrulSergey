import React from "react";
import "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    VerticalTimeline,
    VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import "../assets/styles/Timeline.scss";
import { careerData, CareerItem } from "../service/CareerData";

function Timeline() {
    return (
        <div id="timeline">
            <div className="items-container">
                <h1>Career History</h1>
                <VerticalTimeline>
                    {careerData.map((item: CareerItem, index: number) => (
                        <VerticalTimelineElement
                            key={index}
                            className="vertical-timeline-element--work"
                            date={item.date}
                            icon={<FontAwesomeIcon icon={item.icon} />} // Use specific icon from item
                        >
                            <h3 className="vertical-timeline-element-title">{item.title}</h3>
                            <h4 className="vertical-timeline-element-subtitle">{item.subtitle}</h4>
                            <p>{item.description}</p>
                        </VerticalTimelineElement>
                    ))}
                </VerticalTimeline>
            </div>
        </div>
    );
}

export default Timeline;