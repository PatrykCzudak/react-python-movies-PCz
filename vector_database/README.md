# LAB

W trakcie laboratorium uruchomimy instację serwera za pomocą dostarczonej konfiguracji `docker-compose.yml`. W tym pliku znajdziesz informacje o nazwie usługi, domyślnie tworzonej bazie danych oraz użytkowniku, z którym baza danych się zainicjalizuje. W celu uruchomienia usług wystarczy wykonać poniższe polecenie w linii komend.

```
docker compose up -d
```

Gdy komenda zakończy działanie - znajdziesz dalsze instrukcje w swojej przeglądarce pod adresem [http://localhost:8888](http://localhost:8888).

Po zakończonym laboratorium zatrzymasz usługi za pomocą poniższego polecenia:

```
docker compose down
```

Jeśli nie będziesz używać już pobranych obrazów, możesz całkowicie zwolnić zajmowane miejsce na dysku i posprzątać po tym laboratorium za pomocą poniższej komendy.

```
docker system prune -fa
```
