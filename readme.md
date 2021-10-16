# Todo app
 A simple to-do list app's backend with following features-

-   User authentication using JWT and cookies
-   A todo endpoint which can add, delete, update and list all todos for a spfc. user
-   Todo endpoint will be only for signed in users
<br>

<h2>Tech-stack</h2>

-   Nodejs ,  Expressjs , MongoDB

<br>


<h2>Endpoints</h2>

<table>

<tr>

<th>Endpoints</th>

<th>Description</th>

</tr>

<tr>

<td>/signup</td>

<td>To signup new user</td>

</tr>

<tr>

<td>/signin</td>

<td>To signin an existing user</td>

</tr>

<tr>

<td>/signout</td>

<td>To sigout a user</td>

</tr>

<tr>

</tr>

<tr>

<td>(POST) /todo/create/:userId</td>

<td>For createing a new Todo item</td>

</tr>

<tr>

<td>(GET) /todo/:todoId/:userId</td>

<td>To get a specific Todo item</td>

</tr>

<tr>

<td>(PUT) /todo/:todoId/:userId</td>

<td>For updating an existing Todo item</td>

</tr>

<tr>

<td>(DELETE) /todo/:todoId/:userId</td>

<td>for deleting an existing Todo item</td>

</tr>

<tr>

<td>(GET)  /tods/:userId</td>

<td>For listing all Todos of a specific user</td>

</tr>

</table>

<h2> ![POstman Link](https://www.getpostman.com/collections/905cfb6344b05509378a) </h2>

