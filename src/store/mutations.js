import {
    SET_HABITS_LIST,
    ADD_HABITS_LIST
} from './mutations-type'

export default{
    [ADD_HABITS_LIST](state,habit){
        state.Habits.push(habit);
    },
    [SET_HABITS_LIST](state,habit){
        state.Habits = habit;
    },
}