to run, just serve all the files in this directory using your method of choice.
I have had success doing 
```python3 -m http.server```
OR using the python script in /web directory
```python3 -m pip install tornado```

```python3 web/serve.py```
OR just running the exe


To build exe, run pyinstaller -F serve.py