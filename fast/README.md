
# FAST‑TEST – Smartphone LFA Strip Reader

> **Status:** prototype ‑ not for medical use.
> **License suggestion:** MIT for code, CC‑BY‑4.0 for docs *(confirm before release)*.


## Project Overview

FAST‑TEST muuttaa älypuhelimen taskukokoiseksi lukulaitteeksi räätälöidyille lateral‑flow‑liuskoille (LFA), jotka mittaavat syljen hormonipitoisuuksia – ensimmäisessä vaiheessa kortisolia ($c$) ja testosteronia ($t$).
Kamera kuvaa liuskan, ohjelmisto laskee, montako viivaa mittausalueella näkyy (0–4), ja muuntaa lukumäärän arvioiduksi pitoisuudeksi. Tulokset piirretään vuorokausikäyrälle ja tallennetaan trendiseurantaa varten.


---

## Project Team

| Role                        | Name                  |
| --------------------------- | --------------------- |
| Lead Developer & Researcher | **Anthony Bäckström** |
| Prototype Sponsor / Client  | **Niko Mustonen**     |

---

## Key Features & MVP Scope

| Module                  | Done? | Description                                               |
| ----------------------- | :---: | --------------------------------------------------------- |
| **Image Acquisition**   |   ☐   | Ota kuva sovelluksessa tai lataa tiedosto.                |
| **ROI Detection**       |   ☐   | Rajaudu pelkkään mittausalueeseen, ohita imutyynyt.       |
| **Line Counter**        |   ☐   | Algoritmi laskee 0–4 näkyvää viivaa.                      |
| **Result Mapper**       |   ☐   | Viivamäärä → pitoisuusalue (konfiguroitava).              |
| **Graph & Text Output** |   ☐   | Piirrä piste vuorokausikäyrälle + sanallinen palaute.     |
| **Data Logging**        |   ☐   | Tallenna `(timestamp, hormone, value, lines)` SQLite/CSV. |
| **Config Profiles**     |   ☐   | Vaihda hormoni / viitearvot YAML‑tiedostolla.             |

> *MVP:* Desktop‑Python prototyyppi Jupyterissa.
> *Phase 2:* Porttaus kevyeksi mobiili‑frontendiksi (React Native / Flutter / native).

---

## Repository Layout

```

FAST-TEST/
├─ notebooks/          ← Demo & kehitysvaiheen Jupyter‑tiedostot
│   └─ 01_detection.ipynb
├─ src/                ← Importoitava kirjastokoodi (python -m fasttest ...)
│   ├─ __init__.py
│   ├─ io.py           # kuvan/lokin lataus & tallennus
│   ├─ processing.py   # esikäsittely + ROI
│   ├─ detection.py    # viivan tunnistus & laskenta
│   └─ reporting.py    # kuvien & käyrien generointi
├─ domain/
│   ├─ ranges.yaml     # viivamäärä → pitoisuusrajat
│   └─ cortisol_curve.csv  # referenssikäyrä (aika vs nmol l⁻¹)
├─ tests/              ← pytest‑yksikkötestit
├─ data/
│   ├─ raw/            # esimerkkikuvat (ei gitissä, *.gitignore*)
│   └─ calib/          # kalibrointimateriaalit
├─ docs/               ← lisäkuvat, speksit, paperit
├─ requirements.txt    ← pip‑riippuvuudet
├─ environment.yml     ← vaihtoehtoinen Conda‑spec
├─ .gitignore
└─ .gitlab-ci.yml      ← CI: lint, test, notebook‑to‑HTML
```



## Roadmap


| Viikko | Tavoite                                                      |
| -----: | ------------------------------------------------------------ |
|      1 | Repo & README (tämä), kansiorakenne, baselib skeleton.       |
|      2 | Notebookin perusalgoritmi (ROI + viivalaskuri) & testikuvat. |
|      3 | Kalibrointi‑workflow + ranges.yaml.                          |
|      4 | Grafiikka: vuorokausikäyrä + piste + teksti‑palautteet.      |
|      5 | CLI / Streamlit demo desktopille.                            |
|      6 | (Opt.) 3‑liuskan fallback‑tuki.                              |
|    7–8 | Mobiili‑frontend POC, tiedonsiirto (JSON) Python ↔ app.      |

---

## Estimated Effort & Toolchain

### Estimated Effort (single developer)

| Phase                           | Calendar Weeks | Focus                                      | Estimated Hours |
| ------------------------------- | -------------- | ------------------------------------------ | --------------- |
| 🔹 Planning & repo setup        | 1              | README, skeleton, env setup                | **6 h**         |
| 🔹 Core detection notebook      | 1 – 2          | ROI, line counter prototype                | **12 h**        |
| 🔹 Calibration & testing        | 3              | Dataset curation, threshold tuning, pytest | **10 h**        |
| 🔹 Visualisation & reporting    | 4              | Vuorokausikäyrä grafiikka, text feedback   | **8 h**         |
| 🔹 Desktop demo (CLI/Streamlit) | 5              | Simple UI wrapper, packaging               | **6 h**         |
| 🔹 Optional fallback & refactor | 6              | 3‑liuskan tuki, code cleanup               | **6 h**         |
| 🔹 Mobile POC + sync            | 7 – 8          | React Native bridge, JSON API, docs        | **18 h**        |
| **TOTAL**                       | **\~8 weeks**  | —                                          | **\~66 h**      |

*(Arviot sisältävät puskuria testaukselle ja dokumentoinnille. Todelliset tunnit voivat vaihdella ±30 %.)*

### Toolchain & Dependencies

| Category             | Tool / Library         | Notes                                     |
| -------------------- | ---------------------- | ----------------------------------------- |
| **Core Lang**        | Python ≥ 3.10          | Main processing logic                     |
| **IDE / Editor**     | VS Code                | Free, extensions: Python, Jupyter         |
| **Notebooks**        | JupyterLab             | Rapid prototyping & demos                 |
| **Image Processing** | OpenCV‑Python          | cv2, version pinned in *requirements.txt* |
| **Numerics**         | NumPy, Pandas          | data arrays, calibration tables           |
| **Plotting**         | Matplotlib             | single‑chart figures, no seaborn          |
| **Config**           | PyYAML                 | hormone ranges & settings                 |
| **Web/UI (desktop)** | Streamlit *(optional)* | quick interactive demo                    |
| **Mobile**           | React Native *(expo)*  | POC for camera + graph display            |
| **Testing**          | Pytest                 | unit & integration tests                  |
| **Lint/Format**      | Ruff, Black, isort     | enforced via pre‑commit & CI              |
| **CI**               | GitLab CI              | lint + tests + notebook→HTML artefacts    |
| **Version Control**  | Git (GitLab)           | feature branches + MRs                    |

---
