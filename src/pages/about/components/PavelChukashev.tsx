import React from 'react';

import style from '../about.module.scss';
import { pavelChukashev } from '../data/todolist';
import ToDo from './interface';
import ToDoList from './ListToDo';
// Pavel Chukashev Павел Чукашев PavelChukashev
const PavelChukashev = () => (
  <div>
    <div className={style['todo-avatar']}>
      <img className={style.avatar} alt="zhenokin" src="https://avatars2.githubusercontent.com/u/60574922?s=400&v=4" />
    </div>
    <div className={style['todo-data']}>
      <div className={style['todo-name']}>
        <span className={style.name}>Павел Чукашев</span>
        <span className={style.role}>Developer</span>
      </div>
      <div className={style.todo}>
        {pavelChukashev.map((todo: ToDo) => <ToDoList key={todo.title} todo={todo} style={style} />)}
      </div>
      <div className={style.github}>
        Github:
        <a href="https://github.com/PavelChukashev" style={{ textDecoration: 'none' }}> PavelChukashev</a>
      </div>
    </div>
  </div>
);

export default PavelChukashev;
