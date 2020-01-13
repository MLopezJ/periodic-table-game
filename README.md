# Periodic Table

## About

This application is a periodic table of chemical elements, it contains the atomic number, electron configuration and others chemical properties. This project is created with the intention of practice front-end skills, was building with React and the styles were added with CSS. The periodic table is hosted in Heroku and it is inspired in a previous app called Atom.

## React
The app is compounded by 3 main sections represented in the code by components. Those sections are the header, the matrix and the footer. Each section have his own proposed and will be commented quickly below. 

### Header
The purpose of the header is just to be a place where to put the title

### Matrix
Is the core of the app, this component allowed the representation of the periodic table, is composed by columns and rows and each cell of the matrix is represented by a Square, who is actually other component. 

The square can be a square with a chemical element, a emty square or a tiny square. The square with a chemical element contains into it another component called ChemicalElement, who contains all the chemical specifications of the element. 

The data of the chemical elements is stored in a file into Data folder with json format.

## Hosted
This project is hosted in Heroku. It can be accessed in the following link: http://mh-periodictable.herokuapp.com/
 
## Set up
You can clone or download this project and run it in your localhost.

### How to install
With the cmd, go to the file of the project and type 
 
```
npm install
```

### How to run
Once the application is installed, type 
```
npm start
```
and the application should runs on http://localhost:3000/


## Credits 
This project is inspired in a previous app called Atom (https://atom.horuslugo.com/). Is a more robust application where you can do test to learn about the periodic table, play with the mass calculator and interact with the periodic table. The periodic table created in this project is inspired in the Atom's but logic is own.