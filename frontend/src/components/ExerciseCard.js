import '../css/ExerciseCard.css'

function ExerciseCard(props) {
    return (
        <div className='exercise-card'>
            <h2 className='exercise-name'>
                {props.name}
            </h2>
            <div className='exercise-details'>
                <p>Sets: {props.sets}</p>
                <p>Reps: {props.reps}</p>
            </div>
        </div>
    );
}

export default ExerciseCard;