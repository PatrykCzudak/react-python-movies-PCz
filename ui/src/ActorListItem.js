import { motion } from "framer-motion";

export default function ActorListItem(props) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="card actor-card"
        >
            <div className="actor-info">
                <h3>{props.actor.name} {props.actor.surname}</h3>
            </div>
            <button onClick={props.onDelete} className="delete-button">❌</button>
        </motion.div>
    );
}
