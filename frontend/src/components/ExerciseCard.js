import '../css/ExerciseCard.css'

function ExerciseCard({ name, sets, reps, children }) {
    return (
        <div className={`exercise-card`}>
            <h2 className="exercise-name">{name}</h2>
            <div className="exercise-details">
                <p>Sets: {sets}</p>
                <p>Reps: {reps}</p>
            </div>
            {children && <div className="exercise-actions">{children}</div>}
        </div>
    );
}


export default ExerciseCard;