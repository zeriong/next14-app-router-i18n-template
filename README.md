# create-next-app config
* created recommended.
* using [ typescript, tailwindcss, no-src, app-router, no-alias(@/) ]

# example code

### If Client Component {

<code>
const { t } = useTranslation();<br><br>
// write default text <br>
{ t("Hi there~!") }

</code>

### };

<br>

### If Server Component {

<code>
export default async function Page() {<br>
    const { t } = await getTranslation();<br><br>
// write default text <br>
{ t("Hello World!") }

</code>

### };