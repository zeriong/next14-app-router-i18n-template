# create-next-app config
* created recommended.
* using [ typescript, tailwindcss, no-src, app-router, no-alias(@/) ]

# example code

### If Client Component {

<code>
const { t } = useTranslation();<br><br>
{ t("common.headerTitle") }

</code>

### };

<br>

### If Server Component {

<code>
export default async function Page({ params }: { params: { lng: Locale } }) {<br>
    const t = await getTranslation(params.lng);<br><br>
{ t("common.headerTitle") }

</code>

### };