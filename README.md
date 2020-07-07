
# TEX

## Project folders structure
- `assets` - images, fonts, etc
- `components` - screens, blocks, components
- `services` - abstraction layer of interacting with 3rd party APIs
- `state` - business logic of application state handling, should conform to `redux-ducks` pattern
- `ui` - library of reusable UI components, should not be tightly coupled with app logic, ideally should not have dependencies from other folders 
- `routes` - app routes
- `globalStyles` - global color constants, etc
- `utils` - utility functions
- `constants` - only app-level constants declared here, other ones should be declared close to logic/consumers

## Disclaimer
THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.