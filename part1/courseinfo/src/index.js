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
            {props.title} {props.noOfExercises}
        </p>
    </React.Fragment>
)

const Content = (props) => (
    <React.Fragment>
        <Part title={props.part1} noOfExercises={props.exercises1} />
        <Part title={props.part2} noOfExercises={props.exercises2} />
        <Part title={props.part3} noOfExercises={props.exercises3} />
    </React.Fragment>
)

const Total = (props) => (
    <React.Fragment>
        <p>Number of exercises {props.total}</p>
    </React.Fragment>
)

const App = () => {

    const course = 'Half Stack Application Development'
    const part1 = 'Fundamentals of React'
    const exercises1 = 10
    const part2 = 'Using props to pass data'
    const exercises2 = 7
    const part3 = 'State of a component'
    const exercises3 = 14

    return (
        <div>
            <Header title={course} />
            <Content part1={part1} part2={part2} part3={part3} exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />
            <Total total={exercises1 + exercises2 + exercises3} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))


