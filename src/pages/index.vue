<template>
  <div class="page">
    <div class="title"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
        style="margin-right: 5px;margin-top: 0px;" class="bi bi-list" viewBox="0 0 16 16">
        <path fill-rule="evenodd"
          d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
      </svg>FRAMEWORKS <button @click="add()" type="button" class="btn btn-primary add"><svg
          xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus-circle-fill"
          viewBox="0 0 16 16" style="margin-right: 5px;">
          <path
            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
        </svg>ADD</button></div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Description</th>
          <th scope="col">Deadline</th>
          <th scope="col">Priority</th>
          <th scope="col">is Complete</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in list" :key="index">
          <td>{{ item.title }}</td>
          <td>{{ item.description }}</td>
          <td>{{ item.deadline }}</td>
          <td>{{ item.priority }}</td>
          <td>
            <div class="flex2">
              <input class="form-check-input" @click="complete(index)" style="width: 26px;height: 26px;" type="checkbox"
                value="" id="flexCheckDefault">
            </div>
          </td>
          <td><button v-if="!item.isComplete" type="button" class="btn btn-primary"
              @click="handleUpdate(item, index)"><svg style="margin-right: 5px;" xmlns="http://www.w3.org/2000/svg"
                width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path
                  d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path fill-rule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
              </svg>UPDATE</button>
            <button @click="handleDelete(index)" style="margin-left: 5px;" type="button" class="btn btn-danger"><svg
                style="margin-right: 5px;" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                class="bi bi-x-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path
                  d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>DELETE</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div style="text-align: center;" v-if="list.length == 0">
      no data
    </div>
    <div class="modal" tabindex="-1" style="display: block!important" v-if="ishow">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title"> {{ !ishowAdd ? 'Update' : 'Add' }} Task</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
              @click="handleClose()"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">Title</label>
              <input type="text" v-model="form.title" class="form-control" id="exampleFormControlInput1" placeholder=""
                @input="initTitle = false">
              <div style="color: red;" v-if="form.title == '' && initTitle">Title is required!</div>
            </div>
            <div class="mb-3">
              <label for="exampleFormControlTextarea1" class="form-label">Description</label>
              <textarea v-model="form.description" class="form-control" id="exampleFormControlTextarea1" rows="3"
                @input="initDes = false"></textarea>
              <div style="color: red;" v-if="form.description == '' && initDes">Description is required!</div>
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">Deadline</label>
              <input type="date" v-model="form.deadline" class="form-control" id="exampleFormControlInput1"
                placeholder="">
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">Priority</label>
              <div style="display: flex; align-items: center;">
                <div class="form-check" style="margin-right: 20px;" @click="form.priority = 'Low'">
                  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                  <label class="form-check-label" for="flexRadioDefault1">
                    Low
                  </label>
                </div>
                <div class="form-check" style="margin-right: 20px;" @click="form.priority = 'Med'">
                  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2">
                  <label class="form-check-label" for="flexRadioDefault2">
                    Med
                  </label>
                </div>
                <div class="form-check" @click="form.priority = 'High'">
                  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3">
                  <label class="form-check-label" for="flexRadioDefault3">
                    High
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="addSub()">{{ !ishowAdd ? 'Update' : 'Add' }}</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
              @click="handleClose()">CANCEL</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
let list = ref([])
let ishow = ref(false)
let ishowAdd = ref(false)
let editIndex = ref(null)
let initTitle = ref(false)
let initDes = ref(false)
let form = ref({
  title: '',
  description: '',
  priority: '',
  deadline: '',
  isComplete: false,
})
const add = () => {
  ishow.value = true
  ishowAdd.value = true
}
const handleUpdate = (item, index) => {
  ishow.value = true
  ishowAdd.value = false
  editIndex.value = index
  form.value = { ...item }
}
const complete = (index) => {
  let newList = [...list.value]
  newList[index].isComplete = true
  list.value = newList
  window.c.msg({
    type: "success",
    content: 'complete success',
  });
}
const handleDelete = (index) => {
  let newList = [...list.value]
  newList.splice(index, 1)
  list.value = newList
  window.c.msg({
    type: "success",
    content: 'delete success',
  });
}
const addSub = () => {
  console.log(form.value)
  let flag = false
  if (form.value.title == '') {
    initTitle.value = true
    flag = true
  }
  if (form.value.description == '') {
    initDes.value = true
    flag = true
  }
  if (flag) {
    window.c.msg({
      type: "error",
      content: 'plesae input',
    });
    return false;
  }
  if (ishowAdd.value) {
    list.value.unshift(form.value)
    window.c.msg({
      type: "success",
      content: 'add success',
    });
  } else {
    let newList = [...list.value]
    newList[editIndex.value] = form.value
    list.value = newList
    window.c.msg({
      type: "success",
      content: 'update success',
    });
  }
  ishow.value = false
  form.value = {
    title: '',
    description: '',
    priority: '',
    deadline: '',
    isComplete: false,
  }
}
const handleClose = () => {
  ishow.value = false
  form.value = {
    title: '',
    description: '',
    priority: '',
    deadline: '',
    isComplete: false,
  }
}
</script>
<style scoped lang="less">
.page {
  width: 100%;
  max-width: 1180px;
  min-height: 100vh;
  background: #fff;
  margin: 0 auto;
  overflow: hidden;
}

.title {
  background: #1666bf;
  height: 70px;
  color: #fff;
  font-size: 20px;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: center;

  .add {
    background: #1c76d4;
    width: 120px;
    position: absolute;
    right: 30px;
  }
}

.table th,
.table td {
  height: 60px;
  line-height: 60px;
  text-align: center;
}

.flex2 {
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: center;
}

.modal {
  background: rgba(0, 0, 0, .5);
}

.modal-dialog {
  top: 15%;
}

.bi {
  margin-top: -5px;
}
</style>
