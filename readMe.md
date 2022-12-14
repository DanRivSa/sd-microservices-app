# Instrucciones de ejecución

<img 
    style="display: block; 
           margin-left: auto;
           margin-right: auto;
           width: 30%;"
    src="https://logos-world.net/wp-content/uploads/2021/02/Docker-Logo-700x394.png?size=400" 
    alt="Docker logo">
</img>
<p style="text-align: center; font-weight:bold">
 Este proyecto requiere ser ejecutado con docker
</p>

1. Ejecute el comando `npm install` en los siguientes directorios:
    * client
    * proxy-server
    * key-server
    * authentication-server
 
2. Agregue un archivo denominado `input.txt` en el directorio "in" de la carpeta raíz del proyecto, quedando la siguiente estructura:
    ```
        /in/input.txt
    ```

3. Elimine el contenido del archivo `datos.txt` ubicado en el directorio "/db" 

    ```
        /db/datos.txt
    ```


4. Ejecute el comando `docker compose up` para levantar los contenedores de aplicación y la red docker desplegando el log de las mismas.

   **_NOTA: el cliente fallará la primera ejecución pues los servidores no han terminado de inicializar_**

    Los contenedores a levantar son:
    ```
    * client-app
    * proxy-server:8081
    * key-server:3000
    * authentication-server:5003 
    ```
5. Ingrese en el archivo `input.txt` la operacion a procesar en cualquiera de los siguientes formatos

    * Operación Firma
    ```
    FIRMAR
    <Identidad de usuario de clave>
    <Texto del Mensaje>
    ```
    * Opración Integridad
    ```
    NTEGRIDAD
    <clave de usuario>
    <Texto del Mensaje>
    <Texto de la Firma del Mensaje>
    ```
    * Operación Autenticar
    ```
    AUTENTICAR
    <clave de usuario>
    <Identidad de usuario de clave>
    ```

6. Una vez inicializados los servidores web, en otra terminal inicie la aplicacion cliente de manera manual por medio de los siguientes comandos:
    ```
        docker container start client-app
        docker logs client-app
    ```
## Integrantes
<div style="
margin-left:auto;
margin-right:auto;
">

<table>
    <tbody>
        <tr>
            <td>
<a href="https://github.com/DanRivSa">
  <img src="https://avatars.githubusercontent.com/u/34323866?size=100">
</a>
<br>
@danrivsa
<br>
<small>Daniel Rivero</small>
            </td>
            <td>
<a href="https://github.com/Joshep27">
  <img src="https://avatars.githubusercontent.com/u/73199935?size=100">
</a>
<br>
@Joshep27
<br>
<small>José Flores</small>
            </td>
        </tr>
    </tbody>
</table>
</div>
