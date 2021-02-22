import axios from 'axios';

 class ApiService 
 {
    addUser(user) {
        console.log(user)
        alert(user+" in api Service method");
        return axios.post('http://localhost:8080/createdata',user);
    }

    fatchLoginUser(email,password) {
        return axios.get('http://localhost:8080/loginuser/'+ email+'/'+password);
    }

    addTask(task){
        console.log(task)
        return axios.post('http://localhost:8080/createtask',task)
    }

    fatchTask(email){
        return axios.get('http://localhost:8080/getalltask/'+email)
    }

    deleteUser(taskId){
        return axios.delete('http://localhost:8080/task/delete/'+taskId)
    }
    
    fetchTaskById(taskId){
        return axios.get('http://localhost:8080/task/'+taskId)
    }
    editTask(task){
        alert(task+" in api Service method");
        return axios.put('http://localhost:8080/updatetask/'+task.task_id,task)
    }
    
    fetchUser(){
        return axios.get('http://localhost:8080/getalluser')
    }

    editUserStatu(user){
        return axios.put('http://localhost:8080/updateStatu/'+user.id,user)
    }

    editTaskStatu(task){
        return axios.put('http://localhost:8080/updatetaskStatu/'+task.task_id,task)
    }

    // fetchEmp() {
    //     return axios.get('http://localhost:8080/employee');
        
    // }


    // deleteEmp(userId) {
    //     return axios.delete('http://localhost:8080/employee/delete/'+userId);
    // }
    // fetchEmpById(userId) {
    //     return axios.get('http://localhost:8080/employee/'+ userId);
    // }
    // editEmp(user) {
    //     alert(user+" in api Service method");
    //     return axios.put('http://localhost:8080/upemployee/'+user.employeeId,user);
    // }
 }
 export default new ApiService();