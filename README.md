# E-library
This project is based on MERN technology. E-library is web, where users can borrow a book.



# Zadání:
- [ ] Aplikace pro online knihovny
Vytvořte aplikaci, která umožní správu online knihovny. Aplikace bude rozlišovat dvě role - knihovník (ten co zapůjčuje knihy, knihovník může být jen jeden), zákazník (ten co si knihy půjčuje, muže jich být více).

- [ ] Aplikace bude schopna uchovávat/spravovat katalog knih, který obsahuje název knihy, autora, počet stran, rok vydání, její obrázek (titulní stránku, obal), počet výtisků v knihovně (počet kusů, které je možné vypůjčit, u online knihoven je to počet licencí, které mohou půjčit). Knihovník může přidávat/editovat/mazat tento katalog (není však možné mazat knihy, které má někdo aktuálně půjčené). 

- [ ] Aplikace uchovává/spravuje seznam zákazníků. U zákazníka uchováváme/spravujeme jméno, příjmení, rodné číslo, adresu, uživatelské jméno a heslo. Na konkrétní účet se pak navazují vypůjčené knihy. Zákaznický účet může vytvářet knihovník nebo sám uživatel. V případě že si ho vytvoří sám uživatel,vidí  knihovník upozornění a knihovník musí tento účet schválit před tím než je funkční a umožňuje výpůjčku knih.Pokud je účet schválen, může si zákazník půjčovat knihy nebo editovat své vlastní záznamy. Pokud však dojde k editaci záznamů, je učet opět omezen do schválení knihovníka.

- [ ] Zákazník má možnost půjčit si maximálně 6 knih (a nesmí to být stejné knihy). To provede ze svého účtu tak, že si v katalogu volných knih vybere knihu (pomocí nějakého vhodného UI prvku, např. tlačítka).
- [ ] Knihu je možné půjčit pouze na 6 dní, po šesti dnech se mu kniha automaticky odebere z účtu a vrátí se do katalogu (popřípadě se inkrementuje počet volných kopií). Zakazník může knihu vrátit i ručně pomocí vhodného UI prvku.  Zákazník vidí ve svém účtu seznam vypujčených knih (včetně obrázků) a dobu expirace. Zároveň může vidět zákazník i historii všech výpůjček. 
- [ ] Expiraci a automatické vracení knih řešte na databázové úrovni (vhodnou procedurou, events, triggers, jobs atd..)

- [ ] Knihovník může editovat všechny účty, knihy odebírat a přidělovat, zároveň vidí všechny zákazníky i jejich výpůjčky včetně historie výpůjček.

- [ ] Knihovník schvaluje a muže bannovat účty.

- [ ] V katalogu knih bude možné vyhledávat pomocí názvu nebo (nebo a zároveň) autora nebo (nebo a zároveň) roku vydání knihy. 

- [ ] V seznamu zákazníků bude možné vyhledávat pomocí jména  nebo (nebo a zároveň) příjmení nebo (nebo a zároveň) adresy nebo (nebo a zároveň) rodného čísla. Stejně tak bude možné dle těchto atributů řadit

- [ ] Veškerá vyhledávání v textech budou funkční od zadaných třech znaků a může se jednat o jakoukoliv část textu (v infixu, prefixu nebo sufixu řetězce). Stejně tak bude možné dle těchto atributů řadit.
Veškerá vyhledávání a řazení budou řešena na databázové úrovni (ne řadícím nebo vyhledávacím algoritmem v aplikaci, snažte se maximálně využít funkce databází).

- [ ] Aplikace umožňuje export všech dat do vhodného souboru a jejich opětovný import (něco jako backup, může provést pouze knihovník).

- [ ] Všichni uživatelé se přihlašují přes uživatelské jméno a heslo (i knihovník).

- [ ] Aplikace může být napsána v jakémkoli jazyce či nástroji / UX i UI realizujte dle vašich preferencí a schopností (může se jednat o formulářovou, webovou nebo i vhodně realizovanou konzolovou aplikaci).

- [ ] Jako perzistenční storage bude použito MongoDB (možno použít MongoDB Atlas) . Navrhněte vhodné datové struktury pro tuto aplikaci, využijte vhodné datové typy pro heslo a obrázky (včetně jejich exportu a importu, heslo nesmí být uloženo v plaintextu).

- [ ] Na projektech mužete pracovat v týmech 1 až 3 lidé. Součastí odevzdání bude i vhodná vizualizace zvolené databázové struktury (použijte vhodný vizualizační diagram).
Obhajoba bude na cca 15 minut včetně demonstrace funkční aplikace.


