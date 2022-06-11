# Ataque CSRF

Implementación de ataque CSRF y su preveción usando tokens CSRF.


## Instalación

Para hacer uso de los sitios desarrollados, es necesario tener instalado
[NodeJS](https://nodejs.org/) y [npm](https://npmjs.com). En el caso de algunas
distribuciones de Linux, será necesario instalar este último por separado.

Una vez instalado estos dos, se debe instalar los paquetes necesarios de NodeJS
tanto en el servidor objetivo como en el servidor de ataque. 
```bash
npm install
```
Este comando se debe de ejecutar tanto en el directorio del servidor de ataque
como en el del servidor objetivo.

A su vez, en el servidor de ataque es necesario instalar de manera global
[serve](https://www.npmjs.com/package/serve) para poder inicalizarlo.

```bash
npm install -g serve
```


## Uso

Se deben de tener 2 terminales, una ubicada en el directorio del servidor
objetivo y, la otra, en el servidor de ataque.


En el directorio del servidor objetivo, arrancamos el servidor así.
```bash
npm run start
```

En el directorio del servidor de ataque, inicializamos el servidor así.
```bash
serve -l 3000 .
```

Hecho esto, podemos empezar a experimentar con el ataque CSRF. La web objetivo
se accede en [http://localhost:5000](http://localhost:5000), y la web del
atacante se ingresa por [http://localhost:3000](http://localhost:3000).


## Tokens CSRF

Para hacer uso de los tokens CSRF, se debe de cambiar a la rama denominada
CSRF-Tokens.
```bash
git checkout CSRF-Tokens
```

Es importante recalcar que, al cambiar a esta rama, será necesario volver a
instalar los paquetes necesarios de NodeJS tanto en el servidor objetivo como
en el servidor de ataque.
```bash
npm install
```
Este comando se debe de ejecutar tanto en el directorio del servidor de ataque
como en el del servidor objetivo.

Una vez en la rama de los CSRF Tokens, si se desea volver a la del ataque CSRF,
debemos de trasladarnos a la rama master.
```bash
git checkout master
```
