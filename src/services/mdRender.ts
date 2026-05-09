import MarkdownIt from "markdown-it";

function cutOffDMNotes(content: string): string {
  const dmIndex = content.indexOf('**------- DM NOTES!!!!! -------**');

  if(dmIndex === -1) return content;

  return content.substring(0, dmIndex);
}

export function useMdRender() {
  const md = new MarkdownIt();

  function render(content: string) {

    const parsedForLinks = cutOffDMNotes(content).replace(
      /\[\[([^[\]]+)\]\]/g,
      (_, pageName: string) => {
        const slug = encodeURIComponent(pageName);

        return `[${pageName}](#/${slug})`;
      },
    );

    let render = md.render(parsedForLinks);

    render = render.replace(/\n/g, '<br/>');


    console.log(content, render);

    return render;
  }

  return {
    render,
  };
}
