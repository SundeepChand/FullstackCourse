import React from 'react'

// Component for course header
const Header = ({title}) => <h1>{title}</h1>

// Component for each part of the course
const Part = (props) => (
    <p>
        {props.part.name} {props.part.exercises}
    </p>
)

// Component for the course content.
const Content = (props) => {
    
    const parts = () => props.parts.map((part) => <Part key={part.id} part={part} />)
    
    return(
        <React.Fragment>
            {parts()}
        </React.Fragment>
    )
}

// Component for total no of exercises.
const Total = (props) => {
    let total = 0
    props.parts.forEach((part) => {
        total += part.exercises
    })
    
    return(
        <p><strong>Total of {total} exercises</strong></p>
    )
}

const Course = (props) => (
    <div>
        <Header title={props.course.name} />
        <Content parts={props.course.parts} />
        <Total parts={props.course.parts} />
    </div>
)

export default Course