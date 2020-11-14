import {
    SET_HABITS_LIST,
    ADD_HABITS_LIST
} from './mutations-type'

export default{
    addHabitsList({ commit },habit){
        commit(ADD_HABITS_LIST,habit)
    },
    setHabitsList({ commit },habits){
        commit(SET_HABITS_LIST,habits)
    },
}
