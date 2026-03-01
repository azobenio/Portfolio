/* ===========================================================
   JMS.dev — Portfolio Script
   =========================================================== */

// ---- Theme Toggle (dark/light) ----
(function() {
    const saved = localStorage.getItem('theme');
    if (saved) document.documentElement.setAttribute('data-theme', saved);

    document.querySelectorAll('.theme-toggle').forEach(toggle => {
        toggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
        });
    });
})();

// ---- Language Toggle (FR/EN) ----
(function() {
    const translations = {
        fr: {
            meta__title: 'JMS.dev | Data Engineer — Microsoft Fabric & Snowflake',
            meta__description: 'Portfolio de Jean Marie Sadio, Data Engineer spécialisé Microsoft Fabric, Snowflake et Power BI.',
            // Nav
            nav__home: 'Accueil',
            sb__available: 'Disponible',
            nav__about: 'À propos',
            nav__techstack: 'Tech Stack',
            nav__projects: 'Projets',
            nav__blog: 'Blog',
            nav__newsletter: 'Newsletter',
            // Hero
            hero__badge: 'Data Engineer \u2022 Fabric & Snowflake',
            hero__greeting: 'Salut, je suis',
            hero__desc: 'Je conçois des <span class="text-accent">pipelines de données robustes</span>, des architectures Lakehouse et des solutions analytiques modernes pour transformer la donnée brute en valeur métier.',
            hero__cta_blog: 'Lire mon blog',
            hero__cta_newsletter: "S'abonner",
            hero__stat_years: 'ANNÉES',
            hero__stat_projects: 'PROJETS',
            hero__stat_clients: 'CLIENTS',
            // About
            about__tag: 'À PROPOS',
            about__heading: 'Transformer la donnée en <span class="gradient-text">décisions.</span>',
            about__p1: "Passionné par l'ingénierie des données depuis plusieurs années, j'ai développé une expertise solide sur les plateformes modernes de Data Engineering. Mon approche combine rigueur technique et vision business pour livrer des solutions qui ont un impact réel.",
            about__p2: "Chez <strong>Devoteam</strong>, je conçois et implémente des architectures de données complexes pour des clients grands comptes, en m'appuyant sur <strong>Microsoft Fabric</strong>, <strong>Snowflake</strong> et les meilleures pratiques du secteur.",
            about__p3: "Au-delà du code, je m'intéresse à l'intersection entre technologie et stratégie : comment la donnée peut devenir un véritable avantage concurrentiel pour les organisations.",
            // Certifications
            cert__tag: 'CERTIFICATIONS',
            cert__heading: 'Expertise <span class="gradient-text">validée.</span>',
            // Tech Stack
            ts__tag: 'TECH STACK',
            ts__heading: 'Mes outils <span class="gradient-text">de prédilection.</span>',
            ts__cat_languages: 'Langages',
            ts__cat_platforms: 'Plateformes Data',
            ts__cat_etl: 'ETL / Orchestration',
            ts__cat_cloud: 'Cloud & DevOps',
            ts__cat_modeling: 'Modélisation',
            // Human Behind It
            human__tag: 'THE HUMAN BEHIND IT',
            human__heading: 'Au-delà du <span class="gradient-text">code.</span>',
            human__hobbies_title: 'Ce qui me passionne',
            human__music_label: 'Musique',
            human__music_sub: 'Afrobeats & Hip-Hop',
            human__photo_label: 'Photographie',
            human__photo_sub: 'Street & portraits',
            human__gaming_label: 'Gaming',
            human__gaming_sub: 'FPS & stratégie',
            human__reading_label: 'Lecture',
            human__reading_sub: 'Tech & philosophie',
            human__travel_label: 'Voyage',
            human__travel_sub: 'Explorer le monde',
            human__coffee_label: 'Maté',
            human__coffee_sub: 'Carburant du dev',
            human__philo_title: 'Ma philosophie',
            human__philo_1_sub: 'Livrer tôt, itérer vite',
            human__philo_2_sub: 'Toujours apprendre',
            human__philo_3_sub: 'Vision sur la durée',
            human__philo_4_sub: 'Le plaisir avant tout',
            human__quote: '"Les données sont le pétrole du XXIe siècle — mais seulement si on sait les raffiner."',
            human__mantra: '🎯 Mon mantra : Build → Measure → Learn → Repeat',
            // Projects
            projects__tag: 'PROJETS',
            projects__heading: 'Ce que je <span class="gradient-text">construis.</span>',
            projects__status: 'Coming soon',
            projects__desc: 'Un projet ambitieux est en cours de construction. Quelque chose qui va changer la donne pour les équipes Data...',
            projects__stack_label: 'Stack :',
            projects__feature_1: '???',
            projects__feature_2: '???',
            projects__feature_3: '???',
            projects__cta_more: 'Découvrir',
            projects__cta_contact: 'Me contacter',
            projects__hero_all: 'TOUS LES',
            projects__hero_projects: 'PROJETS',
            projects__hero_desc: 'Une collection de projets Data Engineering, pipelines, architectures Lakehouse et solutions analytiques modernes.',
            projects__stat_projects: 'Projets',
            projects__stat_tech: 'Technologies',
            projects__stat_passion: 'Passion',
            projects__explore: 'Explorer',
            projects__featured_tag: 'PROJET PRINCIPAL',
            projects__other_tag: 'AUTRES PROJETS',
            projects__other_heading: 'Réalisations <span class="gradient-text">professionnelles.</span>',
            projects__filter_all: 'Tous',
            projects__card_done: 'Livré',
            projects__card1_title: 'Migration Lakehouse — Microsoft Fabric',
            projects__card1_desc: 'Migration complète d\'un Data Warehouse legacy vers une architecture Lakehouse sur Microsoft Fabric. Refonte des pipelines ETL, modélisation Delta Lake et gouvernance des données.',
            projects__card1_f1: '50+ tables migrées',
            projects__card1_f2: 'Temps de traitement ÷3',
            projects__card2_title: 'Data Warehouse Analytique — Snowflake',
            projects__card2_desc: 'Conception et implémentation d\'un Data Warehouse analytique sur Snowflake pour un client retail. Modélisation dimensionnelle, ingestion temps-réel et couche sémantique.',
            projects__card2_f1: '20+ sources intégrées',
            projects__card2_f2: 'Dashboards temps-réel',
            projects__card3_title: 'Suite Dashboards Power BI — Secteur Énergie',
            projects__card3_desc: 'Création d\'une suite de dashboards Power BI pour le suivi de la performance opérationnelle. Modèle sémantique DAX avancé, RLS et déploiement via Fabric workspace.',
            projects__card3_f1: '12 rapports interactifs',
            projects__card3_f2: 'Row-Level Security',
            projects__card4_title: 'Pipeline ETL PySpark — Traitement Big Data',
            projects__card4_desc: 'Développement de pipelines PySpark pour le traitement de données volumineuses. Ingestion batch et streaming, transformations complexes et écriture en Delta Lake.',
            projects__card4_f1: '100M+ lignes / jour',
            projects__card4_f2: 'SLA 99.5% uptime',
            projects__card5_title: 'Cross-Tenant Data Integration — ADLS Gen2 vers Fabric',
            projects__card5_desc: 'Intégration de données cross-tenant depuis Azure Data Lake Storage Gen2 vers Microsoft Fabric. Mise en place de la connectivité sécurisée et des pipelines d\'ingestion.',
            projects__card5_f1: 'Multi-tenant sécurisé',
            projects__card5_f2: 'Ingestion automatisée',
            projects__card6_title: 'K-Means Clustering — Segmentation Client',
            projects__card6_desc: 'Analyse de segmentation client avec K-Means et la méthode du coude. Pipeline de données, feature engineering et visualisation des clusters pour la stratégie marketing.',
            projects__card6_f1: '5 segments identifiés',
            projects__card6_f2: '+15% ROI campagnes',
            projects__cta_title: 'Un projet Data en tête<span class="proj-dot">?</span>',
            projects__cta_desc: 'Discutons de votre architecture de données, de vos pipelines ou de votre stratégie Data.',
            projects__cta_email: 'Me contacter',
            // Blog
            blog__tag: 'ARTICLES',
            blog__hero_desc: 'Mes dernières publications sur Microsoft Fabric, Snowflake, Power BI et le Data Engineering.',
            blog__search_placeholder: 'Rechercher un article...',
            blog__filter_all: 'Tous',
            blog__featured_title: 'Power BI September 2025 Update : Schema Evolution & Data Refresh',
            blog__featured_desc: "Le modèle s'adapte intelligemment aux changements de source — colonnes ajoutées, renommées ou supprimées. Schema Evolution et Data Refresh in Desktop changent la donne pour les Data Engineers.",
            blog__read_full: 'Lire sur LinkedIn',
            blog__read_short: 'Lire',
            blog__card1_title: 'DAX Query View : Écrire et tester du DAX directement dans le navigateur',
            blog__card1_excerpt: 'DAX Query View arrive dans Power BI Service / Fabric. Écrire, exécuter et tester des requêtes DAX dans le navigateur avec Copilot intégré.',
            blog__card2_title: 'TMDL View : Gérer vos modèles sémantiques par le code',
            blog__card2_excerpt: 'Le Tabular Model Definition Language View arrive dans Power BI Desktop — scripter et modifier vos modèles sémantiques directement en code.',
            blog__card3_title: 'OneLake Security : Modèle de sécurité unifié dans Fabric',
            blog__card3_excerpt: 'OneLake Security est fondamental dans Fabric. Enforcer des règles de sécurité directement sur les tables stockées dans OneLake.',
            blog__card4_title: 'Azure Data Studio : Fin de vie — et maintenant ?',
            blog__card4_excerpt: 'Microsoft a officiellement déprécié Azure Data Studio. Quelles alternatives pour votre workflow de Data Engineer ?',
            blog__card5_title: 'Agent-To-Agent (A2A) avec Azure AI Foundry',
            blog__card5_excerpt: "Développement d'agents IA avec Azure AI Foundry : concepts, cas d'usage et guide pratique pour créer des architectures A2A.",
            blog__card6_title: 'Devoteam nommé Snowflake Partner of the Year France',
            blog__card6_excerpt: 'Devoteam reconnu comme Snowflake Partner of the Year en France. Une belle reconnaissance de notre expertise Snowflake Data Cloud.',
            blog__card7_title: 'Cross-Tenant Data Integration : ADLS Gen2 vers Fabric',
            blog__card7_excerpt: "Comment copier des données d'un container Azure Data Lake Storage Gen2 cross-tenant et les intégrer dans Microsoft Fabric.",
            blog__card8_title: 'Elbow Method & K-Means : Choisir le bon nombre de clusters',
            blog__card8_excerpt: 'K-Means et la méthode du coude avec KElbowVisualizer de Yellowbrick pour un clustering optimal.',
            // Newsletter
            nl__tag: 'NEWSLETTER',
            nl__title: 'Restez à la pointe du<br><span class="gradient-text" style="font-size:clamp(2rem,5vw,3.4rem);letter-spacing:-1.5px">Data Engineering.</span>',
            nl__desc: 'Chaque semaine, je partage des articles, des retours d\'expérience et des bonnes pratiques sur <strong>Microsoft Fabric</strong>, <strong>Snowflake</strong>, <strong>Power BI</strong> et le monde de la Data.',
            nl__perk1_title: 'Deep dives techniques',
            nl__perk1_sub: 'Fabric, Snowflake, dbt, Azure',
            nl__perk2_title: 'Veille hebdomadaire',
            nl__perk2_sub: 'Les updates qui comptent',
            nl__perk3_title: 'Tips & bonnes pratiques',
            nl__perk3_sub: 'Patterns, optimisations, retours terrain',
            nl__social_proof: 'Rejoignez les passionnés de Data Engineering',
            nl__card_title: 'S\'abonner gratuitement',
            nl__card_desc: 'Recevez chaque nouvel article directement dans votre boîte mail. Pas de spam, que du contenu Data.',
            nl__label_name: 'Prénom',
            nl__label_email: 'Email',
            nl__placeholder_name: 'Votre prénom',
            nl__interests_label: "Centres d'intérêt :",
            nl__chip_fabric: 'Fabric',
            nl__chip_snowflake: 'Snowflake',
            nl__chip_powerbi: 'Power BI',
            nl__chip_azure: 'Azure',
            nl__chip_aiml: 'AI / ML',
            nl__submit: "S'abonner à la newsletter",
            nl__disclaimer: '🔒 Vos données restent privées. Désabonnement en un clic.',
            // Footer
            footer__tagline: 'Data Engineer spécialisé Microsoft Fabric & Snowflake. Transformer la donnée en valeur.',
            footer__local_time: 'heure locale',
            footer__nav_title: 'Navigation',
            footer__nav_home: 'Accueil',
            footer__resources_title: 'Ressources',
            footer__resources_cv: 'CV / Résumé',
            footer__resources_certs: 'Certifications',
            footer__improve_title: 'Améliorer le site',
            footer__improve_suggest: 'Suggérer une idée',
            footer__copyright: '© 2026 JMS.dev — Jean Marie Sadio',
            footer__privacy: 'Confidentialité',
            footer__terms: 'Conditions',
            footer__made_with: 'Fait avec <span class="heart">♥</span> et beaucoup de ☕',
            // Preview (index.html)
            preview__voir_about: 'En savoir plus →',
            preview__voir_stack: 'Voir le stack complet →',
            preview__voir_projets: 'Découvrir →',
            preview__voir_blog: 'Tous les articles →',
            preview__voir_newsletter: "S'abonner →",
        },
        en: {
            meta__title: 'JMS.dev | Data Engineer — Microsoft Fabric & Snowflake',
            meta__description: 'Portfolio of Jean Marie Sadio, Data Engineer specializing in Microsoft Fabric, Snowflake and Power BI.',
            // Nav
            nav__home: 'Home',
            sb__available: 'Available',
            nav__about: 'About',
            nav__techstack: 'Tech Stack',
            nav__projects: 'Projects',
            nav__blog: 'Blog',
            nav__newsletter: 'Newsletter',
            // Hero
            hero__badge: 'Data Engineer \u2022 Fabric & Snowflake',
            hero__greeting: "Hey, I'm",
            hero__desc: 'I design <span class="text-accent">robust data pipelines</span>, Lakehouse architectures and modern analytical solutions to turn raw data into business value.',
            hero__cta_blog: 'Read my blog',
            hero__cta_newsletter: 'Subscribe',
            hero__stat_years: 'YEARS',
            hero__stat_projects: 'PROJECTS',
            hero__stat_clients: 'CLIENTS',
            // About
            about__tag: 'ABOUT',
            about__heading: 'Turning data into <span class="gradient-text">decisions.</span>',
            about__p1: 'Passionate about data engineering for several years, I have built solid expertise on modern Data Engineering platforms. My approach combines technical rigour with a business mindset to deliver solutions with real impact.',
            about__p2: 'At <strong>Devoteam</strong>, I design and implement complex data architectures for large enterprise clients, leveraging <strong>Microsoft Fabric</strong>, <strong>Snowflake</strong> and industry best practices.',
            about__p3: 'Beyond the code, I am interested in the intersection of technology and strategy: how data can become a true competitive advantage for organisations.',
            // Certifications
            cert__tag: 'CERTIFICATIONS',
            cert__heading: 'Validated <span class="gradient-text">expertise.</span>',
            // Tech Stack
            ts__tag: 'TECH STACK',
            ts__heading: 'My tools <span class="gradient-text">of choice.</span>',
            ts__cat_languages: 'Languages',
            ts__cat_platforms: 'Data Platforms',
            ts__cat_etl: 'ETL / Orchestration',
            ts__cat_cloud: 'Cloud & DevOps',
            ts__cat_modeling: 'Modelling',
            // Human Behind It
            human__tag: 'THE HUMAN BEHIND IT',
            human__heading: 'Beyond the <span class="gradient-text">code.</span>',
            human__hobbies_title: 'What I am passionate about',
            human__music_label: 'Music',
            human__music_sub: 'Afrobeats & Hip-Hop',
            human__photo_label: 'Photography',
            human__photo_sub: 'Street & portraits',
            human__gaming_label: 'Gaming',
            human__gaming_sub: 'FPS & strategy',
            human__reading_label: 'Reading',
            human__reading_sub: 'Tech & philosophy',
            human__travel_label: 'Travel',
            human__travel_sub: 'Exploring the world',
            human__coffee_label: 'Maté',
            human__coffee_sub: "Dev's fuel",
            human__philo_title: 'My philosophy',
            human__philo_1_sub: 'Ship early, iterate fast',
            human__philo_2_sub: 'Always be learning',
            human__philo_3_sub: 'Think long-term',
            human__philo_4_sub: 'Enjoy the journey',
            human__quote: '"Data is the oil of the 21st century — but only if you know how to refine it."',
            human__mantra: '🎯 My mantra: Build → Measure → Learn → Repeat',
            // Projects
            projects__tag: 'PROJECTS',
            projects__heading: 'What I am <span class="gradient-text">building.</span>',
            projects__status: 'Coming soon',
            projects__desc: 'An ambitious project is under construction. Something that will change the game for Data teams...',
            projects__stack_label: 'Stack:',
            projects__feature_1: '???',
            projects__feature_2: '???',
            projects__feature_3: '???',
            projects__cta_more: 'Discover',
            projects__cta_contact: 'Contact me',
            projects__hero_all: 'ALL',
            projects__hero_projects: 'PROJECTS',
            projects__hero_desc: 'A curated collection of Data Engineering projects, pipelines, Lakehouse architectures and modern analytical solutions.',
            projects__stat_projects: 'Projects',
            projects__stat_tech: 'Technologies',
            projects__stat_passion: 'Passion',
            projects__explore: 'Explore',
            projects__featured_tag: 'MAIN PROJECT',
            projects__other_tag: 'OTHER PROJECTS',
            projects__other_heading: 'Professional <span class="gradient-text">achievements.</span>',
            projects__filter_all: 'All',
            projects__card_done: 'Delivered',
            projects__card1_title: 'Lakehouse Migration — Microsoft Fabric',
            projects__card1_desc: 'Full migration of a legacy Data Warehouse to a Lakehouse architecture on Microsoft Fabric. ETL pipeline redesign, Delta Lake modelling and data governance.',
            projects__card1_f1: '50+ tables migrated',
            projects__card1_f2: 'Processing time ÷3',
            projects__card2_title: 'Analytical Data Warehouse — Snowflake',
            projects__card2_desc: 'Design and implementation of an analytical Data Warehouse on Snowflake for a retail client. Dimensional modelling, real-time ingestion and semantic layer.',
            projects__card2_f1: '20+ sources integrated',
            projects__card2_f2: 'Real-time dashboards',
            projects__card3_title: 'Power BI Dashboard Suite — Energy Sector',
            projects__card3_desc: 'Creation of a Power BI dashboard suite for operational performance monitoring. Advanced DAX semantic model, RLS and deployment via Fabric workspace.',
            projects__card3_f1: '12 interactive reports',
            projects__card3_f2: 'Row-Level Security',
            projects__card4_title: 'PySpark ETL Pipeline — Big Data Processing',
            projects__card4_desc: 'Development of PySpark pipelines for large-scale data processing. Batch and streaming ingestion, complex transformations and Delta Lake writes.',
            projects__card4_f1: '100M+ rows / day',
            projects__card4_f2: 'SLA 99.5% uptime',
            projects__card5_title: 'Cross-Tenant Data Integration — ADLS Gen2 to Fabric',
            projects__card5_desc: 'Cross-tenant data integration from Azure Data Lake Storage Gen2 to Microsoft Fabric. Secure connectivity setup and ingestion pipeline implementation.',
            projects__card5_f1: 'Secure multi-tenant',
            projects__card5_f2: 'Automated ingestion',
            projects__card6_title: 'K-Means Clustering — Customer Segmentation',
            projects__card6_desc: 'Customer segmentation analysis with K-Means and the elbow method. Data pipeline, feature engineering and cluster visualisation for marketing strategy.',
            projects__card6_f1: '5 segments identified',
            projects__card6_f2: '+15% campaign ROI',
            projects__cta_title: 'Got a Data project in mind<span class="proj-dot">?</span>',
            projects__cta_desc: "Let's discuss your data architecture, pipelines or Data strategy.",
            projects__cta_email: 'Contact me',
            // Blog
            blog__tag: 'ARTICLES',
            blog__hero_desc: 'My latest posts on Microsoft Fabric, Snowflake, Power BI and Data Engineering.',
            blog__search_placeholder: 'Search articles...',
            blog__filter_all: 'All',
            blog__featured_title: 'Power BI September 2025 Update: Schema Evolution & Data Refresh',
            blog__featured_desc: 'The model intelligently adapts to source changes — columns added, renamed or removed. Schema Evolution and Data Refresh in Desktop are game-changers for Data Engineers.',
            blog__read_full: 'Read on LinkedIn',
            blog__read_short: 'Read',
            blog__card1_title: 'DAX Query View: Write and test DAX directly in the browser',
            blog__card1_excerpt: 'DAX Query View comes to Power BI Service / Fabric. Write, run and test DAX queries in the browser with built-in Copilot.',
            blog__card2_title: 'TMDL View: Manage your semantic models with code',
            blog__card2_excerpt: 'Tabular Model Definition Language View arrives in Power BI Desktop — script and modify your semantic models directly in code.',
            blog__card3_title: 'OneLake Security: Unified security model in Fabric',
            blog__card3_excerpt: 'OneLake Security is fundamental in Fabric. Enforce security rules directly on tables stored in OneLake.',
            blog__card4_title: 'Azure Data Studio: End of life — what now?',
            blog__card4_excerpt: 'Microsoft has officially deprecated Azure Data Studio. What alternatives exist for your Data Engineer workflow?',
            blog__card5_title: 'Agent-To-Agent (A2A) with Azure AI Foundry',
            blog__card5_excerpt: 'Building AI agents with Azure AI Foundry: concepts, use cases and practical guide to creating A2A architectures.',
            blog__card6_title: 'Devoteam named Snowflake Partner of the Year France',
            blog__card6_excerpt: "Devoteam recognised as Snowflake Partner of the Year in France. A great recognition of our Snowflake Data Cloud expertise.",
            blog__card7_title: 'Cross-Tenant Data Integration: ADLS Gen2 to Fabric',
            blog__card7_excerpt: 'How to copy data from a cross-tenant Azure Data Lake Storage Gen2 container and integrate it into Microsoft Fabric.',
            blog__card8_title: 'Elbow Method & K-Means: Choosing the right number of clusters',
            blog__card8_excerpt: 'K-Means and the elbow method with KElbowVisualizer from Yellowbrick for optimal clustering.',
            // Newsletter
            nl__tag: 'NEWSLETTER',
            nl__title: 'Stay ahead in<br><span class="gradient-text" style="font-size:clamp(2rem,5vw,3.4rem);letter-spacing:-1.5px">Data Engineering.</span>',
            nl__desc: 'Every week I share articles, experience feedback and best practices on <strong>Microsoft Fabric</strong>, <strong>Snowflake</strong>, <strong>Power BI</strong> and the world of Data.',
            nl__perk1_title: 'Technical deep dives',
            nl__perk1_sub: 'Fabric, Snowflake, dbt, Azure',
            nl__perk2_title: 'Weekly watch',
            nl__perk2_sub: 'The updates that matter',
            nl__perk3_title: 'Tips & best practices',
            nl__perk3_sub: 'Patterns, optimisations, field feedback',
            nl__social_proof: 'Join Data Engineering enthusiasts',
            nl__card_title: 'Subscribe for free',
            nl__card_desc: 'Receive every new article directly in your inbox. No spam, only Data content.',
            nl__label_name: 'First name',
            nl__label_email: 'Email',
            nl__placeholder_name: 'Your first name',
            nl__interests_label: 'Interests:',
            nl__chip_fabric: 'Fabric',
            nl__chip_snowflake: 'Snowflake',
            nl__chip_powerbi: 'Power BI',
            nl__chip_azure: 'Azure',
            nl__chip_aiml: 'AI / ML',
            nl__submit: 'Subscribe to the newsletter',
            nl__disclaimer: '🔒 Your data stays private. Unsubscribe in one click.',
            // Footer
            footer__tagline: 'Data Engineer specialising in Microsoft Fabric & Snowflake. Turning data into value.',
            footer__local_time: 'local time',
            footer__nav_title: 'Navigation',
            footer__nav_home: 'Home',
            footer__resources_title: 'Resources',
            footer__resources_cv: 'CV / Resume',
            footer__resources_certs: 'Certifications',
            footer__improve_title: 'Improve the site',
            footer__improve_suggest: 'Suggest an idea',
            footer__copyright: '© 2026 JMS.dev — Jean Marie Sadio',
            footer__privacy: 'Privacy',
            footer__terms: 'Terms',
            footer__made_with: 'Made with <span class="heart">♥</span> and lots of ☕',
            // Preview (index.html)
            preview__voir_about: 'Learn more →',
            preview__voir_stack: 'See full stack →',
            preview__voir_projets: 'Discover →',
            preview__voir_blog: 'All articles →',
            preview__voir_newsletter: 'Subscribe →',
        }
    };

    function applyLanguage(lang) {
        const t = translations[lang];
        if (!t) return;

        // 1. <html lang="...">
        document.documentElement.setAttribute('lang', lang);

        // 2. <title> and <meta description>
        document.title = t.meta__title;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute('content', t.meta__description);

        // 3. textContent (data-i18n)
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (t[key] !== undefined) el.textContent = t[key];
        });

        // 4. innerHTML (data-i18n-html — nested tags)
        document.querySelectorAll('[data-i18n-html]').forEach(el => {
            const key = el.getAttribute('data-i18n-html');
            if (t[key] !== undefined) el.innerHTML = t[key];
        });

        // 5. placeholder (data-i18n-placeholder)
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (t[key] !== undefined) el.setAttribute('placeholder', t[key]);
        });

        // 6. Button label shows active language
        document.querySelectorAll('.lang-toggle-inner').forEach(el => { el.textContent = lang.toUpperCase(); });

        // 7. Persist
        localStorage.setItem('lang', lang);
    }

    // Init on load
    const saved = localStorage.getItem('lang') || 'fr';
    applyLanguage(saved);

    // Click — tous les boutons lang (sidebar + topbar)
    document.querySelectorAll('.lang-toggle').forEach(toggle => {
        toggle.addEventListener('click', () => {
            const current = localStorage.getItem('lang') || 'fr';
            applyLanguage(current === 'fr' ? 'en' : 'fr');
        });
    });
})();

// ---- Cursor Stalker ----
const stalker = document.getElementById('cursorStalker');
let mx = 0, my = 0, sx = 0, sy = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
(function loop() {
    sx += (mx - sx) * 0.07;
    sy += (my - sy) * 0.07;
    stalker.style.left = sx + 'px';
    stalker.style.top = sy + 'px';
    requestAnimationFrame(loop);
})();

// ---- Capability Card radial glow tracking ----
document.querySelectorAll('.cap-card').forEach(c => {
    c.addEventListener('mousemove', e => {
        const r = c.getBoundingClientRect();
        c.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
        c.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
    });
});

// ---- Mobile drawer toggle ----
(function() {
    const burger = document.getElementById('hdrBurger');
    const drawer = document.getElementById('mobDrawer');
    if (!burger || !drawer) return;
    burger.addEventListener('click', () => {
        burger.classList.toggle('open');
        drawer.classList.toggle('open');
        document.body.style.overflow = drawer.classList.contains('open') ? 'hidden' : '';
    });
    drawer.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            burger.classList.remove('open');
            drawer.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
})();

// ---- Header scroll effect ----
(function() {
    const header = document.getElementById('siteHeader');
    if (!header) return;
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 20);
    });
})();

// ---- Scroll Reveal (Intersection Observer) ----
document.body.classList.add('js-loaded');
const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0, rootMargin: '0px' });
document.querySelectorAll('.anim-scroll').forEach(el => io.observe(el));

// Staggered children inside grids
const ioGrid = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.querySelectorAll('.anim-scroll').forEach((child, i) => {
                child.style.transitionDelay = `${i * 0.08}s`;
                child.classList.add('visible');
            });
        }
    });
}, { threshold: 0, rootMargin: '0px' });
document.querySelectorAll('.process-row, .cap-grid, .blog-grid, .social-row').forEach(g => ioGrid.observe(g));

// ---- Animated Counters ----
function countUp(el, target) {
    let cur = 0;
    const step = target / 35;
    const timer = setInterval(() => {
        cur += step;
        if (cur >= target) { cur = target; clearInterval(timer); }
        el.textContent = Math.floor(cur);
    }, 40);
}
const ioStats = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.querySelectorAll('.stat-num').forEach(n => countUp(n, +n.dataset.target));
            ioStats.unobserve(e.target);
        }
    });
}, { threshold: 0 });
const statsEl = document.querySelector('.hero-stats');
if (statsEl) ioStats.observe(statsEl);

// ---- Smooth scroll ----
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        const t = document.querySelector(a.getAttribute('href'));
        if (t) window.scrollTo({ top: t.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
    });
});

// ---- Active nav link (multi-page header) ----
(function() {
    const page = (window.location.pathname.split('/').pop() || 'index.html');
    document.querySelectorAll('.hdr-link, .mob-link').forEach(link => {
        const href = link.getAttribute('href');
        link.classList.toggle('active', href === page);
    });
})();

// ---- Newsletter Form (Mailchimp) ----
const nlForm = document.getElementById('newsletterForm');
if (nlForm) {
    nlForm.addEventListener('submit', e => {
        const btn = nlForm.querySelector('button[type="submit"]');
        const original = btn.innerHTML;

        // If Mailchimp URL is not set, prevent submission
        if (nlForm.action.includes('YOUR_MAILCHIMP_URL')) {
            e.preventDefault();
            btn.innerHTML = '⚠ Mailchimp non configuré';
            btn.style.background = '#f59e0b';
            btn.disabled = true;
            setTimeout(() => {
                btn.innerHTML = original;
                btn.style.background = '';
                btn.disabled = false;
            }, 3000);
            return;
        }

        // Mailchimp URL is set — allow form to submit (opens in new tab)
        btn.innerHTML = '✓ Inscription réussie !';
        btn.style.background = '#14b8a6';
        btn.disabled = true;
        setTimeout(() => {
            btn.innerHTML = original;
            btn.style.background = '';
            btn.disabled = false;
            nlForm.reset();
            // Tout décocher après reset (choix libre, rien de pré-sélectionné)
            nlForm.querySelectorAll('.nl-chip input[type="checkbox"]').forEach(cb => {
                cb.checked = false;
            });
        }, 3000);
    });
}

// ---- Newsletter Chip Toggle ----
// Le toggle est géré nativement par le <label> HTML — pas besoin de JS

// ---- PARALLAX SCROLLING ENGINE (ultranoir-inspired) ----
// Dramatic multi-layer parallax with smooth lerp, depth & cinematic reveals
(function() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 480;
    if (prefersReduced || isMobile) return;

    document.body.classList.add('parallax-active');

    // ---- Cache DOM ----
    const heroText      = document.querySelector('.hero-text');
    const heroVisual    = document.querySelector('.hero-visual');
    const heroSection   = document.getElementById('hero');
    const heroBadge     = document.querySelector('.hero-badge');
    const heroStats     = document.querySelector('.hero-stats');
    const scrollCue     = document.querySelector('.scroll-cue');
    const decoCircles   = document.querySelectorAll('.deco-circle');
    const orbs          = document.querySelectorAll('.orb');
    const sections      = document.querySelectorAll('.section, .section-alt');
    const previewCards  = document.querySelectorAll('.preview-card');
    const sectionTags   = document.querySelectorAll('.section-tag');
    const sectionHeads  = document.querySelectorAll('.section-heading');
    const miniCards     = document.querySelectorAll('.preview-mini-card');
    const blogItems     = document.querySelectorAll('.preview-blog-item');

    // ---- Smooth lerp (like ultranoir) ----
    // Smooths scroll value so animations feel cinematic, not jerky
    let currentY = 0;
    let targetY  = 0;
    const LERP   = 0.1; // lower = smoother / more cinematic (0.05-0.15)

    function onScroll() { targetY = window.scrollY; }
    window.addEventListener('scroll', onScroll, { passive: true });
    targetY = currentY = window.scrollY;

    // ---- Utility: map value from one range to another ----
    function map(val, inMin, inMax, outMin, outMax) {
        const t = Math.max(0, Math.min(1, (val - inMin) / (inMax - inMin)));
        return outMin + t * (outMax - outMin);
    }

    // ---- Main animation loop ----
    function tick() {
        // Smooth interpolation
        currentY += (targetY - currentY) * LERP;
        const y  = currentY;
        const vh = window.innerHeight;

        // ===== 1. HERO — cinematic depth separation =====
        if (heroSection) {
            const heroH    = heroSection.offsetHeight;
            const progress = Math.min(1, y / (heroH * 0.7)); // 0→1 as hero exits

            // Text block: slides up fast + fades + slight scale down
            if (heroText) {
                const ty = y * 0.45;
                const op = 1 - progress * 1.2;
                const sc = 1 - progress * 0.1;
                heroText.style.transform = `translate3d(0,${ty}px,0) scale(${Math.max(0.85,sc)})`;
                heroText.style.opacity = Math.max(0, op).toFixed(3);
            }

            // Avatar: floats independently — slower, slight rotation
            if (heroVisual) {
                const ty = y * -0.12; // moves UP (opposite direction = depth)
                const rot = progress * 5;
                const sc  = 1 + progress * 0.06;
                const op  = 1 - progress * 0.9;
                heroVisual.style.transform = `translate3d(0,${ty}px,0) scale(${Math.min(1.15,sc)}) rotate(${rot}deg)`;
                heroVisual.style.opacity = Math.max(0, op).toFixed(3);
            }

            // Badge: slides left and fades
            if (heroBadge) {
                const tx = -progress * 80;
                const op = 1 - progress * 1.5;
                heroBadge.style.transform = `translate3d(${tx}px,0,0)`;
                heroBadge.style.opacity = Math.max(0, op).toFixed(3);
            }

            // Stats: slide down and fade
            if (heroStats) {
                const ty = y * 0.6;
                const op = 1 - progress * 1.3;
                heroStats.style.transform = `translate3d(0,${ty}px,0)`;
                heroStats.style.opacity = Math.max(0, op).toFixed(3);
            }

            // Scroll cue: disappears quickly
            if (scrollCue) {
                scrollCue.style.opacity = Math.max(0, 1 - progress * 3).toFixed(3);
            }
        }

        // ===== 2. DECO CIRCLES — dramatic layered depth =====
        decoCircles.forEach((c, i) => {
            const speeds = [0.12, 0.18, 0.25];
            const rotSpeeds = [0.015, -0.02, 0.01];
            const yOff = y * speeds[i % 3];
            const xDrift = Math.sin(y * 0.002 + i * 2) * 40;
            const rot = y * rotSpeeds[i % 3];
            c.style.transform = `translate3d(${xDrift}px,${yOff}px,0) rotate(${rot}deg)`;
        });

        // ===== 3. GRADIENT ORBS — large slow drift =====
        orbs.forEach((orb, i) => {
            const speeds = [0.06, 0.1, 0.08];
            orb.style.marginTop = `${y * speeds[i % 3]}px`;
        });

        // ===== 4. SECTION CONTENT — dramatic scroll-linked reveals =====
        sections.forEach(sec => {
            const rect = sec.getBoundingClientRect();
            const secTop = rect.top;
            const secH   = rect.height;

            // Only process visible sections (with margin)
            if (secTop > vh * 1.3 || secTop + secH < -100) return;

            // Progress: 0 when section top enters viewport, 1 when it reaches top
            const enterProgress = map(secTop, vh, 0, 0, 1);

            // Section glow
            if (enterProgress > 0.05) sec.classList.add('parallax-in-view');

            // Container inner offset — whole section content lifts
            const container = sec.querySelector('.container');
            if (container) {
                const lift = map(enterProgress, 0, 0.5, 60, 0);
                const op   = map(enterProgress, 0, 0.35, 0, 1);
                container.style.transform = `translate3d(0,${lift}px,0)`;
                container.style.opacity = op.toFixed(3);
            }
        });

        // ===== 5. PREVIEW CARDS — horizontal slide + float =====
        previewCards.forEach((card, i) => {
            const rect = card.getBoundingClientRect();
            if (rect.top > vh * 1.1 || rect.bottom < -50) return;
            const progress = map(rect.top, vh, vh * 0.2, 0, 1);
            const tx = (1 - progress) * (i % 2 === 0 ? -80 : 80); // alternate sides
            const ty = (1 - progress) * 40;
            const rot = (1 - progress) * (i % 2 === 0 ? -2 : 2);
            card.style.transform = `translate3d(${tx}px,${ty}px,0) rotate(${rot}deg)`;
            card.style.opacity = Math.min(1, progress * 1.5).toFixed(3);
        });

        // ===== 6. SECTION TAGS — dramatic slide from left =====
        sectionTags.forEach(tag => {
            const rect = tag.getBoundingClientRect();
            if (rect.top > vh || rect.bottom < 0) return;
            const progress = map(rect.top, vh, vh * 0.3, 0, 1);
            const tx = (1 - progress) * -120;
            tag.style.transform = `translate3d(${tx}px,0,0)`;
            tag.style.opacity = Math.min(1, progress * 1.8).toFixed(3);
        });

        // ===== 7. SECTION HEADINGS — scale up reveal =====
        sectionHeads.forEach(h => {
            const rect = h.getBoundingClientRect();
            if (rect.top > vh || rect.bottom < 0) return;
            const progress = map(rect.top, vh, vh * 0.35, 0, 1);
            const sc = map(progress, 0, 1, 0.88, 1);
            const ty = (1 - progress) * 30;
            h.style.transform = `translate3d(0,${ty}px,0) scale(${sc})`;
            h.style.opacity = Math.min(1, progress * 1.4).toFixed(3);
        });

        // ===== 8. MINI CARDS — staggered cascade entrance =====
        miniCards.forEach((card, i) => {
            const rect = card.getBoundingClientRect();
            if (rect.top > vh * 1.1 || rect.bottom < -20) return;
            const progress = map(rect.top, vh, vh * 0.4, 0, 1);
            const delay = i * 0.08; // stagger
            const p = Math.max(0, Math.min(1, progress - delay));
            const ty = (1 - p) * 50;
            const sc = map(p, 0, 1, 0.85, 1);
            card.style.transform = `translate3d(0,${ty}px,0) scale(${sc})`;
            card.style.opacity = Math.min(1, p * 2).toFixed(3);
        });

        // ===== 9. BLOG ITEMS — slide from right staggered =====
        blogItems.forEach((item, i) => {
            const rect = item.getBoundingClientRect();
            if (rect.top > vh * 1.1 || rect.bottom < -20) return;
            const progress = map(rect.top, vh, vh * 0.4, 0, 1);
            const delay = i * 0.1;
            const p = Math.max(0, Math.min(1, progress - delay));
            const tx = (1 - p) * 100;
            item.style.transform = `translate3d(${tx}px,0,0)`;
            item.style.opacity = Math.min(1, p * 2).toFixed(3);
        });

        requestAnimationFrame(tick);
    }

    // Start the loop
    requestAnimationFrame(tick);
})();

// ---- Blog Search & Filter ----
(function() {
    const searchInput = document.getElementById('blogSearch');
    const searchCount = document.getElementById('searchCount');
    const filtersWrap = document.getElementById('blogFilters');
    const blogCards = document.querySelectorAll('.blog-card');
    const blogFeatured = document.querySelector('.blog-featured');
    let activeFilter = 'all';

    if (!searchInput || !filtersWrap) return;

    const filterBtns = filtersWrap.querySelectorAll('.filter-btn');

    function applyFilters() {
        const query = searchInput.value.toLowerCase().trim();
        let visible = 0;

        // All filterable items (featured + grid cards)
        const allItems = [];
        if (blogFeatured) allItems.push(blogFeatured);
        blogCards.forEach(c => allItems.push(c));

        allItems.forEach(card => {
            const cats = (card.dataset.cats || '').toLowerCase();
            const text = card.textContent.toLowerCase();

            const matchFilter = activeFilter === 'all' || cats.includes(activeFilter);
            const matchSearch = !query || text.includes(query);

            if (matchFilter && matchSearch) {
                card.classList.remove('hidden');
                card.style.display = '';
                visible++;
            } else {
                card.classList.add('hidden');
                card.style.display = 'none';
            }
        });

        // Update count
        if (searchCount) {
            const currentLang = localStorage.getItem('lang') || 'fr';
            const word = currentLang === 'fr' ? 'article' : 'article';
            searchCount.textContent = visible + ' ' + word + (visible > 1 ? 's' : '');
        }
    }

    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeFilter = btn.dataset.filter;
            applyFilters();
        });
    });

    // Search input
    searchInput.addEventListener('input', applyFilters);
})();

// ---- Floating Particles (Canvas) ----
(function() {
    const canvas = document.getElementById('particlesCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h, particles = [];
    const PARTICLE_COUNT = 55;

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            this.size = Math.random() * 2.2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.35;
            this.speedY = (Math.random() - 0.5) * 0.35;
            this.opacity = Math.random() * 0.5 + 0.15;
            this.pulse = Math.random() * Math.PI * 2;
            this.pulseSpeed = Math.random() * 0.015 + 0.005;
            // Color: teal or purple randomly
            this.color = Math.random() > 0.5 ? '34,211,197' : '129,140,248';
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.pulse += this.pulseSpeed;
            if (this.x < -10 || this.x > w + 10 || this.y < -10 || this.y > h + 10) this.reset();
        }
        draw() {
            const glow = Math.sin(this.pulse) * 0.3 + 0.7;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color},${this.opacity * glow})`;
            ctx.fill();
            // Subtle glow
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color},${this.opacity * glow * 0.08})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

    // Draw connection lines between nearby particles
    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(34,211,197,${0.06 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, w, h);
        particles.forEach(p => { p.update(); p.draw(); });
        drawConnections();
        requestAnimationFrame(animate);
    }
    animate();
})();

// ---- Project Grid Filter ----
(function() {
    const filtersWrap = document.getElementById('projFilters');
    const projCards = document.querySelectorAll('.proj-card');
    if (!filtersWrap || !projCards.length) return;

    const filterBtns = filtersWrap.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            projCards.forEach(card => {
                const cats = (card.dataset.cats || '').toLowerCase();
                if (filter === 'all' || cats.includes(filter)) {
                    card.classList.remove('hidden');
                    card.style.display = '';
                } else {
                    card.classList.add('hidden');
                    card.style.display = 'none';
                }
            });
        });
    });
})();

// ---- Radial Glow on Cards (mouse tracking) ----
document.querySelectorAll('.ts-card, .hobby-card, .blog-card, .proj-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
        card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
    });
});

// ---- Magnetic Hover on Buttons ----
document.querySelectorAll('.btn-primary, .btn-ghost, .hire-badge').forEach(btn => {
    btn.addEventListener('mousemove', e => {
        const r = btn.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = (e.clientX - cx) * 0.15;
        const dy = (e.clientY - cy) * 0.15;
        btn.style.transform = `translate(${dx}px, ${dy}px)`;
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
    });
});

// ---- Tilt Effect on Code Window ----
(function() {
    const codeWindow = document.querySelector('.code-window');
    if (!codeWindow) return;
    codeWindow.addEventListener('mousemove', e => {
        const r = codeWindow.getBoundingClientRect();
        const cx = (e.clientX - r.left) / r.width - 0.5;
        const cy = (e.clientY - r.top) / r.height - 0.5;
        codeWindow.style.transform = `perspective(800px) rotateY(${cx * 6}deg) rotateX(${-cy * 6}deg)`;
    });
    codeWindow.addEventListener('mouseleave', () => {
        codeWindow.style.transform = '';
    });
    codeWindow.style.transition = 'transform .4s ease';
})();

// ---- Staggered reveal for Tech Stack & Hobby grids ----
const ioGridNew = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            const children = e.target.querySelectorAll('.ts-card, .hobby-card, .proj-card');
            children.forEach((child, i) => {
                child.style.opacity = '0';
                child.style.transform = 'translateY(20px)';
                child.style.transition = `all .5s cubic-bezier(.16,1,.3,1) ${i * 0.06}s`;
                requestAnimationFrame(() => {
                    child.style.opacity = '1';
                    child.style.transform = 'translateY(0)';
                });
            });
            ioGridNew.unobserve(e.target);
        }
    });
}, { threshold: 0, rootMargin: '0px' });
document.querySelectorAll('.ts-grid, .hobby-grid, .proj-grid').forEach(g => ioGridNew.observe(g));

// ---- Local Time (Nantes / Europe/Paris) ----
(function() {
    const timeEl = document.getElementById('localTime');
    if (!timeEl) return;

    function updateTime() {
        const now = new Date();
        const opts = { timeZone: 'Europe/Paris', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
        timeEl.textContent = now.toLocaleTimeString('fr-FR', opts);
    }

    updateTime();
    setInterval(updateTime, 1000);
})();

