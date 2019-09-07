import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (
        <React.Fragment>
            <h1>{props.title}</h1>
        </React.Fragment>
)

const Part = (props) => (
    <React.Fragment>
        <p>
            {props.part.name} {props.part.exercises}
        </p>
    </React.Fragment>
)

const Content = (props) => (
    <React.Fragment>
        <Part part={props.parts[0]} />
        <Part part={props.parts[1]} />
        <Part part={props.parts[2]} />
    </React.Fragment>
)

const Total = (props) => (
    <React.Fragment>
        <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    </React.Fragment>
)

const App = () => {

    const course = {
        name: 'Half Stack Application Development',
        parts : [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    }

    return (
        <div>
            <Header title={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))


